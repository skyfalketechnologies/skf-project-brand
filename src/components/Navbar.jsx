import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogIn, LogOut, Shield, User, UserCheck, ShieldAlert, Bell } from 'lucide-react';
import api from '../services/api';
import { notificationService } from '../services/dataService';


const MOCK_ACCOUNTS = [
  { id: 1, email: 'admin.silvora@gmail.com', first_name: 'System', last_name: 'Admin', role: 'admin', avatar: 'SA' },
  { id: 2, email: 'pm.silas@gmail.com', first_name: 'Silas', last_name: 'Kipkemoi (PM)', role: 'project_manager', avatar: 'SK' },
  { id: 3, email: 'dev.alex@gmail.com', first_name: 'Alex', last_name: 'Developer', role: 'developer', avatar: 'AD' },
  { id: 4, email: 'dev.sarah@gmail.com', first_name: 'Sarah', last_name: 'Developer', role: 'developer', avatar: 'SD' },
  { id: 5, email: 'client.silas@gmail.com', first_name: 'Silas', last_name: 'Client (AI Builder)', role: 'client', clientOfProjectId: 101, avatar: 'SC' },
  { id: 6, email: 'client.dairy@gmail.com', first_name: 'Dairy Farmer', last_name: 'Client (IoT Station)', role: 'client', clientOfProjectId: 103, avatar: 'DF' },
  { id: 7, email: 'viewer.john@gmail.com', first_name: 'John', last_name: 'Auditor (Viewer)', role: 'viewer', avatar: 'JV' }
];

const Navbar = () => {
  const location = useLocation();
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // AUTHENTICATION STATES
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('silvora_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showManualLogin, setShowManualLogin] = useState(false);
  const [typedEmail, setTypedEmail] = useState('');

  // NAV STATES
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // NOTIFICATION STATES & HANDLERS
  const [notifications, setNotifications] = useState([]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getNotifications();
      // Ensure we only show notifications meant for current user (or all if admin)
      setNotifications(data.results || data);
    } catch (err) {
      console.warn("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 45000);
      return () => clearInterval(interval);
    } else {
      setNotifications([]);
    }
  }, [currentUser]);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.warn("Failed to mark notification read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const unread = notifications.filter(n => !n.is_read);
      await Promise.all(unread.map(n => notificationService.markAsRead(n.id)));
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.warn("Failed to mark all as read:", err);
    }
  };

  useEffect(() => {
    const handleAuthChange = () => {
      const saved = localStorage.getItem('silvora_user');
      setCurrentUser(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener('auth-change', handleAuthChange);

    // Close profile dropdown when clicking outside
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotificationsDropdown(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);


  // Google Identity Services Credential Handler
  const handleGoogleCredentialResponse = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await api.post('/auth/google-login/', { token });
      const { access, refresh, user } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('silvora_user', JSON.stringify(user));

      window.dispatchEvent(new Event('auth-change'));
      setShowLoginModal(false);
    } catch (err) {
      console.error('Google Sign In authentication failed:', err);
      alert('Authentication failed: ' + (err.response?.data?.error || err.message));
    }
  };

  // Google Identity Services Script loader & button renderer
  useEffect(() => {
    if (showLoginModal) {
      const initGoogle = () => {
        if (window.google) {
          const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id-here';
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          const buttonDiv = document.getElementById('google-signin-button');
          if (buttonDiv) {
            window.google.accounts.id.renderButton(buttonDiv, {
              theme: 'outline',
              size: 'large',
              width: 320,
              text: 'signin_with',
              shape: 'rectangular',
            });
          }
        } else {
          setTimeout(initGoogle, 100);
        }
      };
      initGoogle();
    }
  }, [showLoginModal]);

  const handleGoogleLogin = async (email) => {
    if (!email || !email.trim()) return;
    const sanitizedEmail = email.trim().toLowerCase();

    try {
      // Authenticate against the real running Django backend with mock token bypass!
      const response = await api.post('/auth/google-login/', {
        token: `mock_dev_token_${sanitizedEmail}`,
        email: sanitizedEmail
      });
      const { access, refresh, user } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('silvora_user', JSON.stringify(user));

      window.dispatchEvent(new Event('auth-change'));
      setTypedEmail('');
      setShowLoginModal(false);
    } catch (err) {
      console.warn('Backend oauth handshake unavailable. Using resilient mock fallback:', err);
      // Fallback locally to ensure frontend dev is never blocked
      const prefix = sanitizedEmail.split('@')[0];
      const account = {
        id: 999,
        email: sanitizedEmail,
        first_name: prefix.split('.')[0].toUpperCase(),
        last_name: 'Admin',
        role: sanitizedEmail.includes('client') ? 'client' : 'admin', // Default to admin for typed emails, client if client in email
        avatar: prefix.substring(0, 2).toUpperCase()
      };
      localStorage.setItem('silvora_user', JSON.stringify(account));
      window.dispatchEvent(new Event('auth-change'));
      setTypedEmail('');
      setShowLoginModal(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await api.post('/auth/logout/', { refresh: refreshToken });
      }
    } catch (err) {
      console.warn('Backend logout failed or was unreachable:', err);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('silvora_user');
      window.dispatchEvent(new Event('auth-change'));
      setShowProfileDropdown(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'Market', path: '/marketplace' },
  ];

  const industries = [
    { name: 'Healthcare', path: '/industries/healthcare' },
    { name: 'Education', path: '/industries/education' },
    { name: 'Agriculture', path: '/industries/agriculture' },
    { name: 'E-Commerce', path: '/industries/ecommerce' },
    { name: 'Finance', path: '/industries/finance' },
  ];

  const moreLinks = [
    { name: 'Pricing', path: '/pricing' },
    { name: 'Partners', path: '/partners' },
    { name: 'Team', path: '/team' },
    { name: 'Testimonials', path: '/testimonials' },
  ];

  const handleMobileLinkClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const linkClass = (path) =>
    `text-sm font-medium transition-colors ${isActive(path) ? 'text-emerald-300' : 'text-slate-200 hover:text-white'
    }`;

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-500 text-white';
      case 'project_manager': return 'bg-amber-500 text-white';
      case 'developer': return 'bg-blue-600 text-white';
      case 'client': return 'bg-emerald-600 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-[#14532d] via-[#166534] to-[#0f172a] border-b border-emerald-800/40 text-white h-20 w-full flex items-center sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <svg viewBox="0 0 56 42" className="h-8 w-auto transform transition-transform group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="36" height="8" rx="4" fill="#4ade80" />
              <rect x="2" y="12" width="36" height="8" rx="4" fill="#60a5fa" />
              <rect x="18" y="22" width="36" height="8" rx="4" fill="#4ade80" />
              <rect x="18" y="32" width="36" height="8" rx="4" fill="#60a5fa" />
              <circle cx="48" cy="8" r="2.5" fill="#4ade80" opacity="0.9" />
              <circle cx="8" cy="32" r="2.5" fill="#60a5fa" opacity="0.9" />
            </svg>
            <span className="text-2xl font-bold tracking-tight font-sans">
              <span className="text-white">Silvora</span>
              <span className="text-emerald-300"> Labs</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}

            <div className="relative group py-2">
              <button type="button" className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-white transition-colors focus:outline-none">
                Industries
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 bg-[#0f172a] border border-emerald-800/50 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {industries.map((ind) => (
                  <Link
                    key={ind.name}
                    to={ind.path}
                    className="block px-4 py-2.5 text-xs text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/50 transition-colors"
                  >
                    {ind.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group py-2">
              <button type="button" className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-white transition-colors focus:outline-none">
                More
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 bg-[#0f172a] border border-emerald-800/50 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {moreLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-2.5 text-xs text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/50 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* SECURE SESSION PANEL OR LOGIN CTA */}
            {currentUser ? (
              <div className="flex items-center gap-4">
                {/* NOTIFICATIONS DROPDOWN */}
                <div className="relative" ref={notificationRef}>
                  <button
                    type="button"
                    onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                    className="p-2 text-slate-300 hover:text-white hover:bg-emerald-950/40 border border-transparent hover:border-emerald-800/50 rounded-full transition-all relative active:scale-95 flex items-center justify-center"
                    aria-label="View notifications"
                  >
                    <Bell size={18} />
                    {notifications.filter(n => !n.is_read).length > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-amber-500 rounded-full text-[9px] font-black text-slate-950 flex items-center justify-center px-1 animate-pulse">
                        {notifications.filter(n => !n.is_read).length}
                      </span>
                    )}
                  </button>

                  {showNotificationsDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-[#0f172a] border border-emerald-800/50 rounded-2xl shadow-2xl py-3 z-50 font-sans text-white">
                      <div className="px-4 pb-2 border-b border-emerald-900/40 flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Alerts & Reminders</span>
                        {notifications.filter(n => !n.is_read).length > 0 && (
                          <button
                            type="button"
                            onClick={handleMarkAllRead}
                            className="text-[9px] font-black uppercase text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div className="max-h-64 overflow-y-auto pt-2 divide-y divide-emerald-950/30">
                        {notifications.length === 0 ? (
                          <p className="text-center py-6 text-xs text-slate-500 italic">No notifications logged yet.</p>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`px-4 py-3 flex flex-col gap-1 hover:bg-emerald-950/20 transition-all ${!n.is_read ? 'bg-emerald-950/10 border-l-2 border-amber-500' : ''
                                }`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <h4 className={`text-xs font-bold leading-tight ${!n.is_read ? 'text-white' : 'text-slate-400'}`}>
                                  {n.title}
                                </h4>
                                {!n.is_read && (
                                  <button
                                    type="button"
                                    onClick={() => handleMarkAsRead(n.id)}
                                    className="text-[8px] font-black uppercase text-amber-500 hover:text-amber-400 transition-colors shrink-0"
                                    title="Mark read"
                                  >
                                    Clear
                                  </button>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 leading-normal">{n.message}</p>
                              <span className="text-[8px] text-slate-500 font-mono mt-1">
                                {new Date(n.created_at).toLocaleString()}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* PROFILE DROPDOWN */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/50 rounded-full px-3 py-1.5 hover:bg-emerald-900/30 transition-all font-sans active:scale-95"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-[10px] font-black text-slate-900 flex items-center justify-center">
                      {currentUser.avatar}
                    </div>
                    <span className="text-xs font-bold text-slate-200 max-w-[80px] truncate">{currentUser.first_name}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-[#0f172a] border border-emerald-800/50 rounded-xl shadow-xl py-3 z-50 font-sans">
                      <div className="px-4 pb-2 border-b border-emerald-900/40">
                        <p className="text-xs font-bold text-slate-200">{currentUser.first_name} {currentUser.last_name}</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{currentUser.email}</p>
                        <span className={`inline-block text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mt-2 ${getRoleBadgeColor(currentUser.role)}`}>
                          {currentUser.role.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="pt-2 px-2">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-950/20 hover:text-red-300 rounded-lg transition-colors font-bold text-left"
                        >
                          <LogOut size={13} />
                          Sign Out Session
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/30 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all"
              >
                <LogIn size={13} className="text-[#4ade80]" />
                Sign In
              </button>
            )}

            <Link
              to="/contact"
              className="bg-[#1565C0] hover:bg-[#1976D2] text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-900/30 shrink-0"
            >
              Reach Out
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-200 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="absolute top-20 left-0 w-full bg-[#0f172a] border-t border-emerald-800/40 md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto z-50 shadow-xl">
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleMobileLinkClick}
                  className={`text-lg font-medium ${isActive(link.path) ? 'text-emerald-300' : 'text-slate-200'}`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'industries' ? null : 'industries')}
                  className="flex items-center justify-between w-full text-lg font-medium text-slate-200 focus:outline-none"
                >
                  <span>Industries</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'industries' && (
                  <div className="pl-4 space-y-3 pt-1">
                    {industries.map((ind) => (
                      <Link key={ind.name} to={ind.path} onClick={handleMobileLinkClick} className="block text-base text-slate-400 hover:text-emerald-300">
                        {ind.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
                  className="flex items-center justify-between w-full text-lg font-medium text-slate-200 focus:outline-none"
                >
                  <span>More</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'more' && (
                  <div className="pl-4 space-y-3 pt-1">
                    {moreLinks.map((item) => (
                      <Link key={item.name} to={item.path} onClick={handleMobileLinkClick} className="block text-base text-slate-400 hover:text-emerald-300">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Auth options */}
              <div className="border-t border-emerald-900/40 pt-4 space-y-4">
                {currentUser ? (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-[11px] font-black text-slate-900 flex items-center justify-center shrink-0">
                        {currentUser.avatar}
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-bold text-slate-200">{currentUser.first_name} {currentUser.last_name}</p>
                        <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleSignOut();
                        handleMobileLinkClick();
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-red-950/20 text-red-400 py-2.5 rounded-full text-sm font-bold border border-red-900/20"
                    >
                      <LogOut size={14} /> Sign Out Session
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(true);
                      handleMobileLinkClick();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-950/40 border border-emerald-800/60 text-white py-2.5 rounded-full text-sm font-bold"
                  >
                    <LogIn size={14} className="text-[#4ade80]" /> Sign In Gmail
                  </button>
                )}
              </div>

              <Link
                to="/contact"
                onClick={handleMobileLinkClick}
                className="bg-[#1565C0] text-white px-6 py-3 rounded-full text-center font-bold"
              >
                Reach Out
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* SIMULATED GMAIL / GOOGLE SIGN-IN INTERIOR MODAL (Gated overlay everywhere) */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-[440px] w-full shadow-2xl border border-slate-100 p-8 font-sans relative animate-in fade-in zoom-in-95 duration-200">

            <button
              type="button"
              onClick={() => {
                setShowLoginModal(false);
                setTypedEmail('');
                setShowManualLogin(false);
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1.5 hover:bg-slate-100 rounded-full transition-all"
            >
              <X size={18} />
            </button>

            {/* Silvora Labs Branded Logo */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center gap-3 mb-3">
                <svg viewBox="0 0 56 42" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="36" height="8" rx="4" fill="#4ade80" />
                  <rect x="2" y="12" width="36" height="8" rx="4" fill="#60a5fa" />
                  <rect x="18" y="22" width="36" height="8" rx="4" fill="#4ade80" />
                  <rect x="18" y="32" width="36" height="8" rx="4" fill="#60a5fa" />
                  <circle cx="48" cy="8" r="2.5" fill="#4ade80" opacity="0.9" />
                  <circle cx="8" cy="32" r="2.5" fill="#60a5fa" opacity="0.9" />
                </svg>
                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-slate-900">Silvora</span>
                  <span className="text-emerald-600"> Labs</span>
                </span>
              </div>
              <div className="h-px w-full bg-slate-100 mt-1"></div>
            </div>



            {/* Official Google Identity Services Sign-In Button Container */}
            <div className="flex justify-center mb-6 min-h-[44px]">
              <div id="google-signin-button"></div>
            </div>

            {/* Divider / Manual Bypass Option */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <button
                type="button"
                onClick={() => setShowManualLogin(!showManualLogin)}
                className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors focus:outline-none"
              >
                {showManualLogin ? "Hide Developer Form" : "Developer / Bypass Sign In"}
              </button>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Developer/Bypass Sign in Form */}
            {showManualLogin && (
              <form onSubmit={(e) => { e.preventDefault(); handleGoogleLogin(typedEmail); }} className="space-y-6 pt-2">

                <div className="relative group">
                  <input
                    type="email"
                    required
                    placeholder="Email or phone"
                    value={typedEmail}
                    onChange={(e) => setTypedEmail(e.target.value)}
                    className="w-full px-4 py-4 border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent transition-all placeholder:text-transparent peer"
                    id="google_email_input"
                  />
                  <label
                    htmlFor="google_email_input"
                    className="absolute left-4 top-4 text-sm text-slate-500 transition-all pointer-events-none transform peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-[#1a73e8] peer-focus:bg-white peer-focus:px-1
                    peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Email or phone
                  </label>
                </div>

                <div className="flex justify-between items-center text-xs text-[#1a73e8] font-bold">
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Please enter your registered workspace or Google email directly."); }} className="hover:underline">Forgot email?</a>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Not your computer? Use Guest mode to sign in privately. <a href="#learnmore" className="text-[#1a73e8] font-bold hover:underline">Learn more</a>
                </p>

                {/* Form Action Footer */}
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => alert("Please contact Silvora PM to register new developer or client email records.")}
                    className="text-xs text-[#1a73e8] font-bold hover:bg-blue-50 px-3 py-2.5 rounded transition-all"
                  >
                    Create account
                  </button>

                  <button
                    type="submit"
                    className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-2.5 rounded text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
                  >
                    Next
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
