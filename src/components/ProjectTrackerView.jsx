import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trackerService } from '../services/dataService';
import api from '../services/api';
import SkeletonLoader from './SkeletonLoader';
import {
  Layout,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Users,
  Trash2,
  Lock,
  Shield,
  UserCheck,
  User,
  PlusCircle,
  Check,
  AlertCircle,
  X,
  ChevronRight,
  ShieldAlert,
  Sliders,
  Sparkles,
  LogIn,
  LogOut,
  Globe,
  Monitor,
  CheckCircle,
  Eye,
  Bell,
  AlertTriangle,
  CalendarClock
} from 'lucide-react';

// OFFICIAL SILVORA LABS CORPORATE LOGO
export const SilvoraLogo = ({ className = "h-5 w-auto" }) => (
  <svg
    viewBox="0 0 56 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="2" y="2" width="36" height="8" rx="4" fill="#4ade80" />
    <rect x="2" y="12" width="36" height="8" rx="4" fill="#60a5fa" />
    <rect x="18" y="22" width="36" height="8" rx="4" fill="#4ade80" />
    <rect x="18" y="32" width="36" height="8" rx="4" fill="#60a5fa" />
    <circle cx="48" cy="8" r="2.5" fill="#4ade80" />
    <circle cx="8" cy="32" r="2.5" fill="#60a5fa" />
  </svg>
);

// MOCK ACCOUNTS WITH GMAIL/GOOGLE AUTHENTICATION SIMULATION
const MOCK_ACCOUNTS = [
  { id: 1, email: 'admin.silvora@gmail.com', first_name: 'System', last_name: 'Admin', role: 'admin', avatar: 'SA' },
  { id: 2, email: 'pm.silas@gmail.com', first_name: 'Silas', last_name: 'Kipkemoi (PM)', role: 'project_manager', avatar: 'SK' },
  { id: 3, email: 'dev.alex@gmail.com', first_name: 'Alex', last_name: 'Developer', role: 'developer', avatar: 'AD' },
  { id: 4, email: 'dev.sarah@gmail.com', first_name: 'Sarah', last_name: 'Developer', role: 'developer', avatar: 'SD' },
  { id: 5, email: 'client.silas@gmail.com', first_name: 'Silas', last_name: 'Client (AI Builder)', role: 'client', clientOfProjectId: 101, avatar: 'SC' },
  { id: 6, email: 'client.dairy@gmail.com', first_name: 'Dairy Farmer', last_name: 'Client (IoT Station)', role: 'client', clientOfProjectId: 103, avatar: 'DF' },
  { id: 7, email: 'viewer.john@gmail.com', first_name: 'John', last_name: 'Auditor (Viewer)', role: 'viewer', avatar: 'JV' }
];

const INITIAL_MOCK_PROJECTS = [
  {
    id: 101,
    name: "Silvora AI Document Builder",
    status: "active",
    progress: 68,
    deadline: "2026-06-15",
    team: [1, 2, 3], // admin, pm_silas, dev_alex
    client_id: 5, // client.silas@gmail.com
    task_count: 5,
    completed_task_count: 2,
    live_preview_available: true,
    live_preview_url: "https://ai-builder-preview.silvora.com"
  },
  {
    id: 102,
    name: "VisionSoft Theme Migration",
    description: "Re-skinning corporate assets with premium Royal Navy and Growth Green palettes and soft-rounded geometric borders.",
    status: "completed",
    progress: 100,
    deadline: "2026-05-20",
    team: [1, 2, 4], // admin, pm_silas, dev_sarah
    client_id: null,
    task_count: 3,
    completed_task_count: 3,
    live_preview_available: false,
    live_preview_url: ""
  },
  {
    id: 103,
    name: "Dairy Station IoT Weighbridge",
    description: "Synchronizing weighbridge metrics and collection office tickets with centralized accounting endpoints.",
    status: "planning",
    progress: 15,
    deadline: "2026-08-30",
    team: [1, 2, 3, 4], // All team
    client_id: 6, // client.dairy@gmail.com
    task_count: 4,
    completed_task_count: 0,
    live_preview_available: true,
    live_preview_url: "https://dairy-iot-preview.silvora.com"
  }
];

const INITIAL_MOCK_TASKS = [
  // Silvora AI Builder
  { id: 201, project: 101, title: "Design interactive Role Selector HUD", priority: "high", status: "done", assigned_to: 3, due_date: "2026-05-28" },
  { id: 202, project: 101, title: "Implement strict permission guards on task toggles", priority: "high", status: "in_progress", assigned_to: 3, due_date: "2026-05-30" },
  { id: 203, project: 101, title: "Create dynamic project assembly modal", priority: "medium", status: "done", assigned_to: 4, due_date: "2026-05-22" },
  { id: 204, project: 101, title: "Write high-standard sync-frontend automation script", priority: "high", status: "todo", assigned_to: 2, due_date: "2026-05-25" },
  { id: 205, project: 101, title: "Conduct full accessibility and audit review", priority: "low", status: "todo", assigned_to: 7, due_date: "2026-06-10" },

  // VisionSoft Migration
  { id: 206, project: 102, title: "Define Royal Navy base Tailwind CSS tokens", priority: "high", status: "done", assigned_to: 4, due_date: "2026-05-15" },
  { id: 207, project: 102, title: "Apply soft-rounded card structures", priority: "medium", status: "done", assigned_to: 4, due_date: "2026-05-18" },
  { id: 208, project: 102, title: "Integrate spring micro-animations", priority: "low", status: "done", assigned_to: 2, due_date: "2026-05-19" },

  // Dairy Station IoT
  { id: 209, project: 103, title: "Calibrate weighbridge Bluetooth listeners", priority: "high", status: "in_progress", assigned_to: 3, due_date: "2026-06-15" },
  { id: 210, project: 103, title: "Establish JWT verification handshake", priority: "high", status: "todo", assigned_to: 4, due_date: "2026-06-20" },
  { id: 211, project: 103, title: "Draft ledger accounting API schemas", priority: "medium", status: "todo", assigned_to: 2, due_date: "2026-07-05" },
  { id: 212, project: 103, title: "Configure real-time dispatch dashboard", priority: "low", status: "todo", assigned_to: 7, due_date: "2026-07-15" }
];

const ProjectTrackerView = () => {
  const queryClient = useQueryClient();

  // AUTHENTICATION STATE
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('silvora_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const saved = localStorage.getItem('silvora_user');
      const userObj = saved ? JSON.parse(saved) : null;
      setCurrentUser(userObj);
      if (userObj) {
        if (userObj.role === 'client') {
          setSelectedProjectId(userObj.clientOfProjectId);
        } else {
          setSelectedProjectId(101);
        }
      }
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const handleSignOut = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await api.post('/auth/logout/', { refresh: refreshToken });
      }
    } catch (err) {
      console.warn('Sign out request failed:', err);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('silvora_user');
      window.dispatchEvent(new Event('auth-change'));
    }
  };

  const [selectedProjectId, setSelectedProjectId] = useState(() => {
    const saved = localStorage.getItem('silvora_user');
    const userObj = saved ? JSON.parse(saved) : null;
    return userObj?.role === 'client' ? userObj.clientOfProjectId : 101;
  });
  const [toasts, setToasts] = useState([]);

  // MODAL STATES
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // FORM STATES
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectDeadline, setNewProjectDeadline] = useState('');
  const [newProjectTeam, setNewProjectTeam] = useState([1]);
  const [newProjectClient, setNewProjectClient] = useState('');
  const [newProjectLiveUrl, setNewProjectLiveUrl] = useState('');

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskAssignee, setNewTaskAssignee] = useState(3);
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  // FALLBACK LOCAL STATES (Resilient mock state fallbacks)
  const [mockProjects, setMockProjects] = useState(INITIAL_MOCK_PROJECTS);
  const [mockTasks, setMockTasks] = useState(INITIAL_MOCK_TASKS);

  // CLIENT PREVIEW SIMULATION STATES
  const [selectedPreviewTab, setSelectedPreviewTab] = useState('app'); // 'app' or 'code'
  const [previewClickCount, setPreviewClickCount] = useState(0);

  // REMINDER BANNER STATE — auto-reappears every 5 minutes after dismiss
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    if (!bannerDismissed) return;
    const timer = setTimeout(() => setBannerDismissed(false), 5 * 60 * 1000); // 5 min
    return () => clearTimeout(timer);
  }, [bannerDismissed]);

  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // BACKEND API QUERIES
  const { data: serverProjects, isLoading: serverProjectsLoading, isError: serverProjectsError } = useQuery({
    queryKey: ['tracker-projects'],
    queryFn: trackerService.getProjects,
    retry: 1,
    enabled: !!currentUser
  });

  const { data: serverTasks, isLoading: serverTasksLoading, isError: serverTasksError } = useQuery({
    queryKey: ['tracker-tasks', selectedProjectId],
    queryFn: () => trackerService.getTasks(selectedProjectId),
    enabled: !!selectedProjectId && !!currentUser,
    retry: 1
  });

  // MUTATIONS (with optimistic/local backups)
  const queryInvalidation = () => {
    queryClient.invalidateQueries(['tracker-tasks', selectedProjectId]);
    queryClient.invalidateQueries(['tracker-projects']);
  };

  const createProjectMutation = useMutation({
    mutationFn: trackerService.createProject,
    onSuccess: (data) => {
      queryInvalidation();
      triggerToast(`Project "${data.name}" created on backend!`);
    },
    onError: () => {
      const newProj = {
        id: Date.now(),
        name: newProjectName,
        description: newProjectDesc,
        status: 'planning',
        progress: 0,
        deadline: newProjectDeadline || null,
        team: newProjectTeam,
        client_id: newProjectClient ? parseInt(newProjectClient) : null,
        task_count: 0,
        completed_task_count: 0,
        live_preview_available: !!newProjectLiveUrl,
        live_preview_url: newProjectLiveUrl
      };
      setMockProjects(prev => [newProj, ...prev]);
      setSelectedProjectId(newProj.id);
      triggerToast(`[Offline Sandbox] Project "${newProjectName}" logged in local memory!`, 'info');
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: trackerService.deleteProject,
    onSuccess: () => {
      queryInvalidation();
      triggerToast("Project deleted from backend server!");
    },
    onError: (err, projId) => {
      setMockProjects(prev => prev.filter(p => p.id !== projId));
      setMockTasks(prev => prev.filter(t => t.project !== projId));
      triggerToast(`[Offline Sandbox] Project deleted from local memory!`, 'info');
    }
  });

  const createTaskMutation = useMutation({
    mutationFn: trackerService.createTask,
    onSuccess: (data) => {
      queryInvalidation();
      triggerToast(`Task "${data.title}" added to the server!`);
    },
    onError: () => {
      const newTaskObj = {
        id: Date.now(),
        project: selectedProjectId,
        title: newTaskTitle,
        priority: newTaskPriority,
        status: 'todo',
        assigned_to: parseInt(newTaskAssignee),
        due_date: newTaskDueDate || null
      };
      setMockTasks(prev => [...prev, newTaskObj]);

      setMockProjects(prev => prev.map(p => {
        if (p.id === selectedProjectId) {
          const total = p.task_count + 1;
          return { ...p, task_count: total };
        }
        return p;
      }));

      triggerToast(`[Offline Sandbox] Task "${newTaskTitle}" added in local state!`, 'info');
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }) => trackerService.updateTask(id, data),
    onSuccess: () => {
      queryInvalidation();
      triggerToast("Task status updated on backend server!");
    },
    onError: (err, { id, data }) => {
      setMockTasks(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));

      // Update progress metrics locally
      setTimeout(() => {
        setMockProjects(prev => prev.map(p => {
          if (p.id === selectedProjectId) {
            const projectTasks = mockTasks.map(t => t.id === id ? { ...t, ...data } : t).filter(t => t.project === selectedProjectId);
            const total = projectTasks.length;
            const completed = projectTasks.filter(t => t.status === 'done').length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
            return {
              ...p,
              task_count: total,
              completed_task_count: completed,
              progress
            };
          }
          return p;
        }));
      }, 50);

      triggerToast(`[Offline Sandbox] Status updated in local memory!`, 'info');
    }
  });

  // RESOLVE RENDER DATA
  const isServerAvailable = !serverProjectsError && serverProjects?.results;

  const projects = isServerAvailable ? serverProjects.results : mockProjects;
  const rawTasks = isServerAvailable ? serverTasks?.results || [] : mockTasks;
  const tasks = isServerAvailable ? rawTasks : rawTasks.filter(t => t.project === selectedProjectId);
  const loading = isServerAvailable ? (serverProjectsLoading || serverTasksLoading) : false;

  // IF NOT AUTHENTICATED OR LOGGED OUT: RENDER SECURE GATEWAY BANNER PROMPT
  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 shadow-xl p-10 text-center font-sans">
        <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-500">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-xl font-black text-slate-800">Secure Access Authentication Gate</h2>
        <p className="text-slate-500 text-xs mt-2 max-w-md mx-auto leading-relaxed">
          Please click the **"Sign In"** button in the top-right navigation bar to authenticate your workspace credentials via your registered Google/Gmail account.
        </p>
      </div>
    );
  }

  // ACTIVE RENDER STATE CONSTANTS
  const selectedProject = projects?.find(p => p.id === selectedProjectId);
  const userRole = currentUser.role;

  // DYNAMIC ROLE PERMISSION BOUNDARIES
  const isProjectTeamMember = selectedProject?.team?.includes(currentUser.id);
  const isClientOwner = userRole === 'client' && selectedProject?.client_id === currentUser.id;

  const canCreateProject = userRole === 'admin';
  const canDeleteProject = userRole === 'admin';
  const canCreateTask = userRole === 'admin' || (userRole === 'project_manager' && isProjectTeamMember);
  const canReassignMembers = userRole === 'admin' || (userRole === 'project_manager' && isProjectTeamMember);

  const canToggleTask = (task) => {
    if (userRole === 'admin') return true;
    if (userRole === 'project_manager' && isProjectTeamMember) return true;
    if (userRole === 'developer' && task.assigned_to === currentUser.id) return true;
    return false;
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-500 text-white border-red-400';
      case 'project_manager': return 'bg-amber-500 text-white border-amber-400';
      case 'developer': return 'bg-blue-600 text-white border-blue-500';
      case 'client': return 'bg-emerald-600 text-white border-emerald-500';
      default: return 'bg-slate-500 text-white border-slate-400';
    }
  };

  // CLIENT REGISTRATION HANDLERS (Admins & PMs)
  const handleAssignClient = async (projId, clientId) => {
    if (userRole !== 'admin' && userRole !== 'project_manager') {
      triggerToast("Access Denied: Only Admins or PMs can register clients.", "error");
      return;
    }

    const targetClientId = clientId ? parseInt(clientId) : null;

    try {
      // Patch real backend database
      await trackerService.updateProject(projId, { client_id: targetClientId });
      queryInvalidation();
    } catch (err) {
      console.warn("Mock fallback active for client assignment update:", err);
    }

    // Always update local mock fallback
    setMockProjects(prev => prev.map(p => {
      if (p.id === projId) {
        return { ...p, client_id: targetClientId };
      }
      return p;
    }));

    // Find client details to print toast
    const client = MOCK_ACCOUNTS.find(c => c.id === parseInt(clientId));
    triggerToast(clientId
      ? `Client "${client?.first_name}" successfully registered to this project pipeline!`
      : "Client registration cleared for this project.",
      "success"
    );
  };

  // STANDARD FORM HANDLERS
  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!canCreateProject) return;
    if (!newProjectName.trim()) return;

    createProjectMutation.mutate({
      name: newProjectName,
      description: newProjectDesc,
      deadline: newProjectDeadline || null,
      team: newProjectTeam
    });

    setNewProjectName('');
    setNewProjectDesc('');
    setNewProjectDeadline('');
    setNewProjectTeam([1]);
    setNewProjectClient('');
    setNewProjectLiveUrl('');
    setShowProjectModal(false);
  };

  const handleDeleteProject = (projId, name) => {
    if (!canDeleteProject) return;
    if (window.confirm(`Are you sure you want to delete project "${name}" and all its tasks?`)) {
      deleteProjectMutation.mutate(projId);
      if (selectedProjectId === projId) {
        setSelectedProjectId(projects.find(p => p.id !== projId)?.id || null);
      }
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!canCreateTask) return;
    if (!newTaskTitle.trim()) return;

    createTaskMutation.mutate({
      project: selectedProjectId,
      title: newTaskTitle,
      priority: newTaskPriority,
      assigned_to: parseInt(newTaskAssignee),
      due_date: newTaskDueDate || null,
      status: 'todo'
    });

    setNewTaskTitle('');
    setNewTaskPriority('medium');
    setNewTaskAssignee(3);
    setNewTaskDueDate('');
    setShowTaskModal(false);
  };

  const handleTaskStatusToggle = (task) => {
    if (!canToggleTask(task)) {
      if (userRole === 'client') {
        triggerToast("Access Denied: Clients have read-only progress visibility.", "error");
      } else if (userRole === 'developer') {
        triggerToast("Access Denied: Developers can only toggle their assigned tasks.", "error");
      } else {
        triggerToast("Access Denied: Permissions locked.", "error");
      }
      return;
    }

    const nextStatus = task.status === 'done' ? 'todo' : 'done';
    updateTaskMutation.mutate({
      id: task.id,
      data: { status: nextStatus }
    });
  };

  const handleTaskAssigneeChange = (task, newAssigneeId) => {
    if (!canReassignMembers) return;
    updateTaskMutation.mutate({
      id: task.id,
      data: { assigned_to: parseInt(newAssigneeId) }
    });
  };

  // ─── REMINDER BANNER COMPUTED DATA ───────────────────────────────
  const bannerData = (() => {
    if (!tasks || tasks.length === 0) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const remaining = tasks.filter(t => t.status !== 'done');
    const overdue = remaining.filter(t => {
      if (!t.due_date) return false;
      const d = new Date(t.due_date);
      d.setHours(0, 0, 0, 0);
      return d < today;
    });

    // Nearest future deadline
    const futureTasks = remaining.filter(t => t.due_date).map(t => ({
      ...t,
      _d: new Date(t.due_date)
    })).filter(t => t._d >= today).sort((a, b) => a._d - b._d);

    const nearest = futureTasks[0] || null;

    const urgency = overdue.length > 0 ? 'red'
      : nearest && Math.round((nearest._d - today) / 86400000) <= 3 ? 'orange'
        : 'green';

    return { remaining: remaining.length, overdue: overdue.length, nearest, urgency };
  })();

  return (
    <div className="space-y-6 bg-slate-50/50 p-3 sm:p-6 rounded-2xl border border-slate-100">

      {/* BRANDED TOAST STACK */}
      <div className="fixed top-24 right-2 sm:right-6 z-50 flex flex-col gap-3 max-w-[90vw] sm:max-w-xs">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border text-sm font-medium transition-all animate-bounce ${t.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' :
              t.type === 'info' ? 'bg-[#0f172a] text-[#4ade80] border-[#334155]' :
                'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
          >
            <SilvoraLogo className="h-5 w-auto shrink-0" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* ── ANIMATED REMINDER BANNER ─────────────────────────────────── */}
      {bannerData && !bannerDismissed && (
        <div
          style={{
            animation: 'bannerSlideIn 0.4s cubic-bezier(0.22,1,0.36,1) both'
          }}
          className={`
            flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs font-semibold
            shadow-sm select-none transition-all duration-300
            ${bannerData.urgency === 'red'
              ? 'bg-red-950/90 border-red-800/60 text-red-200 dark:bg-red-950/80'
              : bannerData.urgency === 'orange'
                ? 'bg-amber-950/90 border-amber-700/60 text-amber-200 dark:bg-amber-950/80'
                : 'bg-emerald-950/80 border-emerald-800/40 text-emerald-200 dark:bg-emerald-950/70'
            }
          `}
        >
          {/* Left: icon + message */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {/* Pulse dot */}
            <span
              className={`shrink-0 w-2 h-2 rounded-full ${bannerData.urgency === 'red'
                ? 'bg-red-400 animate-pulse'
                : bannerData.urgency === 'orange'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-emerald-400'
                }`}
            />

            {/* Icon */}
            {bannerData.urgency === 'red' ? (
              <AlertTriangle size={13} className="shrink-0 text-red-400" />
            ) : bannerData.urgency === 'orange' ? (
              <CalendarClock size={13} className="shrink-0 text-amber-400" />
            ) : (
              <CheckCircle size={13} className="shrink-0 text-emerald-400" />
            )}

            {/* Message */}
            <span className="truncate tracking-wide">
              {bannerData.overdue > 0 && (
                <span className="text-red-300 font-bold">⚠️ {bannerData.overdue} overdue {bannerData.overdue === 1 ? 'task' : 'tasks'}</span>
              )}
              {bannerData.overdue > 0 && bannerData.remaining > 0 && <span className="opacity-40 mx-1.5">•</span>}
              {bannerData.remaining > 0 && (
                <span>{bannerData.remaining} task{bannerData.remaining !== 1 ? 's' : ''} remaining</span>
              )}
              {bannerData.remaining === 0 && bannerData.overdue === 0 && (
                <span className="text-emerald-300 font-bold">✅ All tasks complete</span>
              )}
              {bannerData.nearest && (
                <>
                  <span className="opacity-40 mx-1.5">•</span>
                  <span className={bannerData.urgency === 'orange' ? 'text-amber-300 font-bold' : 'opacity-80'}>
                    Next deadline: {new Date(bannerData.nearest.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </>
              )}
            </span>
          </div>

          {/* Right: dismiss */}
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss banner"
            className={`shrink-0 p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity ${bannerData.urgency === 'red' ? 'hover:bg-red-800/40'
              : bannerData.urgency === 'orange' ? 'hover:bg-amber-800/40'
                : 'hover:bg-emerald-800/40'
              }`}
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Banner slide-in keyframe (injected once) */}
      <style>{`
        @keyframes bannerSlideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ACTIVE USER SESSION HUD */}
      <div className="bg-[#1B3A5C] text-white p-6 rounded-2xl shadow-md border border-blue-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sliders className="text-white w-5 h-5" />
              <h2 className="text-xs font-bold tracking-widest uppercase text-red-400">Branded Session HUD</h2>
            </div>
            <h3 className="text-base sm:text-xl font-bold font-sans text-white">
              Logged in as: <span className="font-mono text-white break-all">{currentUser.email}</span>
            </h3>
            <p className="text-white text-xs mt-1 max-w-xl">
              build for the future, one commit at a time            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase border tracking-wider flex items-center gap-2 ${getRoleBadgeColor(currentUser.role)}`}>
              {currentUser.role === 'admin' ? <Shield size={14} /> :
                currentUser.role === 'project_manager' ? <UserCheck size={14} /> : <User size={14} />}
              {currentUser.first_name} ({currentUser.role.toUpperCase()})
            </span>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold transition-all text-slate-200"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* RENDER DEDICATED VIEW BOUNDARY */}
      {userRole === 'client' ? (

        // ----------------------------------------------------
        // CLIENT DELIVERY PORTAL (STRICT ACCESS ISOLATION)
        // ----------------------------------------------------
        <div className="space-y-8 font-sans">
          {!selectedProject || selectedProject.client_id !== currentUser.id ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-sm">
              <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
              <h3 className="text-lg font-bold text-slate-800">No Registered Pipelines Found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Client Project Summary Panel (Left) */}
              <div className="lg:col-span-5 space-y-6">

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <span className="text-[9px] font-black uppercase text-emerald-600 tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Live Client Pipeline</span>
                    <h2 className="text-xl font-bold text-slate-900 mt-4">{selectedProject.name}</h2>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed font-sans">{selectedProject.description}</p>
                  </div>

                  {/* Delivery Timeline / Status */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Estimated Delivery:</span>
                      <span className="font-bold text-slate-800">{selectedProject.deadline ? new Date(selectedProject.deadline).toLocaleDateString() : 'Under Planning'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Milestones Status:</span>
                      <span className="font-black text-emerald-600 capitalize bg-emerald-50 px-2 py-0.5 rounded text-[10px]">{selectedProject.status}</span>
                    </div>
                  </div>

                  {/* Overall Development Progress */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Overall Progress Completion</span>
                      <span className="text-[#0891b2] font-mono">{selectedProject.progress}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0891b2] to-[#4ade80] transition-all duration-500"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Progress Milestones Checklist (Read-Only) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pipeline Milestones</h3>

                  <div className="space-y-3">
                    {tasks.map(task => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-xs ${task.status === 'done'
                          ? 'bg-slate-50/50 border-slate-100 text-slate-400'
                          : 'bg-white border-slate-100 text-slate-700'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          {task.status === 'done' ? (
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                          ) : (
                            <Clock size={16} className="text-[#0891b2] shrink-0" />
                          )}
                          <span className={task.status === 'done' ? 'line-through' : 'font-semibold'}>{task.title}</span>
                        </div>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${task.status === 'done' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-700'
                          }`}>
                          {task.status === 'done' ? 'Verified' : 'In Dev'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Client Interactive Live Preview Frame (Right) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center pr-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Monitor size={14} className="text-[#0891b2]" /> Development Sandbox Environment
                  </h3>
                  <div className="bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded text-[10px] font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live Preview
                  </div>
                </div>

                {/* Simulated Web View Container */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[520px]">

                  {/* Browser Mock Navigation Bar */}
                  <div className="bg-slate-850 px-4 py-3 flex items-center gap-3 border-b border-slate-800/80 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                    </div>
                    <div className="bg-slate-800/80 border border-slate-700/30 rounded-lg flex-grow px-3 py-1 flex items-center gap-2 text-[10px] text-slate-400 font-mono max-w-md">
                      <Globe size={10} className="text-emerald-500" />
                      <span>{selectedProject.live_preview_url || 'https://sandbox.silvora.com'}</span>
                    </div>

                    {/* Simulated Screen Tabs */}
                    <div className="flex bg-slate-800/50 p-0.5 rounded-lg border border-slate-750">
                      <button
                        type="button"
                        onClick={() => setSelectedPreviewTab('app')}
                        className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase transition-all ${selectedPreviewTab === 'app' ? 'bg-[#1B3A5C] text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                        App Screen
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPreviewTab('code')}
                        className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase transition-all ${selectedPreviewTab === 'code' ? 'bg-[#1B3A5C] text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                        Console logs
                      </button>
                    </div>
                  </div>

                  {/* Browser Screen Content viewport */}
                  <div className="flex-grow p-6 bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">

                    {selectedPreviewTab === 'app' ? (

                      // APP MODE MOCK SCREEN
                      <div className="text-center space-y-6 max-w-md relative z-10 transition-all duration-300">

                        <div className="bg-[#1B3A5C] p-6 rounded-3xl border border-blue-800/30 shadow-lg space-y-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                            <SilvoraLogo className="h-6 w-auto" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white uppercase tracking-wider">{selectedProject.name}</h4>
                            <p className="text-slate-400 text-[10px] mt-1.5 font-mono">Sandbox Build v0.8.4 - Healthy</p>
                          </div>
                        </div>

                        {/* Interactive Click Simulator Widget */}
                        <div className="bg-[#0f172a] border border-slate-800/60 p-5 rounded-2xl space-y-3">
                          <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                            Click to execute simulated live document context tune:
                          </p>

                          <button
                            type="button"
                            onClick={() => {
                              setPreviewClickCount(c => c + 1);
                              triggerToast(`Simulated Live Preview Trigger: Context tuning compiled successfully (Run #${previewClickCount + 1})`, 'info');
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 mx-auto active:scale-95"
                          >
                            <Eye size={12} /> Test Live Context Tuning (Run #{previewClickCount})
                          </button>
                        </div>

                        <p className="text-[10px] text-slate-500">
                          This screen mocks your web application interface under current production deployment schedules. Click to interact.
                        </p>
                      </div>

                    ) : (

                      // CODE CONSOLE LOGS MODE
                      <div className="w-full h-full font-mono text-xs text-emerald-400 text-left p-4 space-y-2 max-h-[350px] overflow-y-auto">
                        <p className="text-slate-500">// INITIALIZING SECURE CLIENT ENVIRONMENT HANDSHAKE</p>
                        <p>✓ Connected to Silvora Labs core container endpoint [HTTPS OK]</p>
                        <p>✓ Loaded client credentials token payload corresponding to: {currentUser.email}</p>
                        <p className="text-[#0891b2] font-bold">✓ Project database association verification matching record ID #{selectedProjectId} [PASSED]</p>
                        <p>✓ Pipeline progress metrics: {selectedProject.progress}% verified</p>
                        <p>✓ Running mock live servers simulating: {selectedProject.live_preview_url}</p>
                        <p className="text-amber-400">// Current console inputs captured: {previewClickCount} debug context tunings compiled.</p>
                        <p className="text-slate-500">// End of system reports.</p>
                      </div>

                    )}

                  </div>

                </div>
              </div>

            </div>
          )}
        </div>
      ) : (

        // ----------------------------------------------------
        // FULL INTERNAL DEV / ADMIN DESK VIEW (WITH ACCESS DIRECTORY)
        // ----------------------------------------------------
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 font-sans">

          {/* SIDEBAR: PROJECTS LIST */}
          <div className="xl:col-span-4 space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Pipeline Roster</h2>
              {canCreateProject && (
                <button
                  type="button"
                  onClick={() => setShowProjectModal(true)}
                  className="flex items-center gap-1 text-[10px] font-bold text-[#0891b2] hover:text-[#0e7490] transition-colors uppercase tracking-widest"
                >
                  <PlusCircle size={14} /> Add Project
                </button>
              )}
            </div>

            <div className="space-y-3">
              {projects?.map(project => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer group/item relative ${selectedProjectId === project.id
                    ? 'bg-white border-[#0891b2] shadow-md ring-1 ring-[#0891b2]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                >
                  {canDeleteProject && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project.id, project.name);
                      }}
                      className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-lg"
                      title="Delete Project"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  <div className="flex justify-between items-start mb-3 pr-6">
                    <h3 className="font-bold text-slate-900 text-sm truncate">{project.name}</h3>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${project.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0891b2] transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        {project.completed_task_count}/{project.task_count} Tasks
                      </div>

                      {project.client_id && (
                        <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <UserCheck size={11} /> Client Linked
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {(!projects || projects.length === 0) && (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <AlertCircle className="mx-auto text-slate-300 mb-2" size={24} />
                  <p className="text-xs text-slate-400 italic">No projects active.</p>
                </div>
              )}
            </div>
          </div>

          {/* WORKSPACE: BACKLOG BOARD & CLIENT ASSIGNMENT PANEL */}
          <div className="xl:col-span-8">
            {!selectedProjectId ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
                <Layout className="text-slate-200 mb-4" size={48} />
                <h3 className="font-bold text-slate-400 uppercase tracking-tight">Select a project pipeline</h3>
                <p className="text-slate-400 text-xs mt-2">Access boards, logs, and client preview frames securely.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">

                  {/* Project Metadata Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{selectedProject?.name}</h2>
                      <p className="text-slate-500 text-xs mt-1.5 max-w-xl">{selectedProject?.description}</p>
                    </div>

                    {canCreateTask ? (
                      <button
                        type="button"
                        onClick={() => setShowTaskModal(true)}
                        className="flex items-center gap-2 bg-[#0891b2] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#0e7490] transition-colors shadow-sm"
                      >
                        <Plus size={14} /> Add Task
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50">
                        <Lock size={12} /> Read-only Scope
                      </div>
                    )}
                  </div>

                  {/* ADMIN/PM ONLY PANEL: CLIENT REGISTERING / LINKING HUD */}
                  {(userRole === 'admin' || userRole === 'project_manager') && (
                    <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-1.5">
                          <UserCheck size={14} className="text-emerald-600" /> Client Progress Access Registration
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Assign a registered client Gmail account to allow them private access.</p>
                      </div>

                      <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Linked Client:</span>
                        <select
                          value={selectedProject?.client_id || ''}
                          onChange={(e) => handleAssignClient(selectedProject.id, e.target.value)}
                          className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#0891b2]"
                        >
                          <option value="">-- No Client Linked --</option>
                          {MOCK_ACCOUNTS.filter(a => a.role === 'client').map(client => (
                            <option key={client.id} value={client.id}>
                              {client.first_name} ({client.email})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Metadata Dashboard Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100 text-xs">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target Deadline</p>
                      <p className="font-bold text-slate-900">{selectedProject?.deadline ? new Date(selectedProject.deadline).toLocaleDateString() : 'None Set'}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Team Roster</p>
                      <p className="font-bold text-slate-900">{selectedProject?.team?.length || 0} members</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Project Status</p>
                      <span className="font-bold text-emerald-600 capitalize">{selectedProject?.status}</span>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Task Completion</p>
                      <p className="font-bold text-slate-900">{selectedProject?.completed_task_count} / {selectedProject?.task_count} Done</p>
                    </div>
                  </div>

                  {/* Task List Backlog */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workspace Backlog</h3>

                    {loading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map(i => <SkeletonLoader key={i} className="h-16" />)}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {tasks?.map(task => {
                          const isToggleable = canToggleTask(task);
                          const assignee = MOCK_ACCOUNTS.find(u => u.id === task.assigned_to);

                          return (
                            <div
                              key={task.id}
                              className={`group/task flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border transition-all ${task.status === 'done'
                                ? 'bg-slate-50/50 border-slate-100'
                                : 'bg-white border-slate-200/80 hover:border-slate-300'
                                }`}
                            >
                              <div className="flex items-center gap-4">
                                <button
                                  type="button"
                                  onClick={() => handleTaskStatusToggle(task)}
                                  className={`transition-colors relative p-1 rounded-lg ${task.status === 'done'
                                    ? 'text-emerald-500 hover:text-emerald-600'
                                    : isToggleable
                                      ? 'text-slate-300 hover:text-slate-500'
                                      : 'text-slate-200 cursor-not-allowed'
                                    }`}
                                  title={isToggleable ? 'Toggle Status' : 'Locked'}
                                >
                                  {task.status === 'done' ? (
                                    <CheckCircle2 size={20} />
                                  ) : !isToggleable ? (
                                    <div className="relative">
                                      <Circle size={20} />
                                      <Lock size={8} className="absolute inset-0 m-auto text-slate-400" />
                                    </div>
                                  ) : (
                                    <Circle size={20} />
                                  )}
                                </button>

                                <div>
                                  <h4 className={`text-sm font-bold flex items-center gap-2 ${task.status === 'done' ? 'text-slate-400 line-through font-medium' : 'text-slate-900'
                                    }`}>
                                    {task.title}
                                    {!isToggleable && task.status !== 'done' && (
                                      <span className="text-[9px] font-normal text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                        <Lock size={8} /> Locked
                                      </span>
                                    )}
                                  </h4>

                                  <div className="flex items-center gap-3 mt-1.5 font-mono text-[9px] text-slate-400">
                                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${task.priority === 'high' ? 'bg-red-50 text-red-600 border border-red-100' :
                                      task.priority === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                        'bg-blue-50 text-blue-600 border border-blue-100'
                                      }`}>
                                      {task.priority}
                                    </span>
                                    {task.due_date && <span>Due: {task.due_date}</span>}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 self-start sm:self-auto">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase">Assignee:</span>
                                  {canReassignMembers ? (
                                    <select
                                      value={task.assigned_to}
                                      onChange={(e) => handleTaskAssigneeChange(task, e.target.value)}
                                      className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#0891b2]"
                                    >
                                      {MOCK_ACCOUNTS.map(user => (
                                        <option key={user.id} value={user.id}>
                                          {user.first_name} ({user.role.substring(0, 2).toUpperCase()})
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600">
                                      <span className="text-xs">{assignee?.first_name}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {(!tasks || tasks.length === 0) && (
                          <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                            <AlertCircle className="mx-auto mb-2 opacity-20" size={32} />
                            <p className="text-xs italic">No backlog items logged yet for this project pipeline.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* MODAL 1: CREATE PROJECT */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden font-sans">
            <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
                <Layout size={16} className="text-[#0891b2]" /> Create New Pipeline
              </h3>
              <button type="button" onClick={() => setShowProjectModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Project Name</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Silvora Data Sync"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Description</label>
                <textarea
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="State project scope, metrics, and parameters..."
                  rows="2"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Estimated Deadline</label>
                <input
                  type="date"
                  value={newProjectDeadline}
                  onChange={(e) => setNewProjectDeadline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Register Client Access</label>
                  <select
                    value={newProjectClient}
                    onChange={(e) => setNewProjectClient(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
                  >
                    <option value="">-- No Client Linked --</option>
                    {MOCK_ACCOUNTS.filter(a => a.role === 'client').map(c => (
                      <option key={c.id} value={c.id}>{c.first_name} ({c.email})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Sandbox Preview URL</label>
                  <input
                    type="url"
                    value={newProjectLiveUrl}
                    onChange={(e) => setNewProjectLiveUrl(e.target.value)}
                    placeholder="https://preview.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0891b2] hover:bg-[#0e7490] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md mt-2"
              >
                Compile and Log Pipeline
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD TASK */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden font-sans">
            <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
                <CheckCircle size={16} className="text-[#0891b2]" /> Add Pipeline Milestone
              </h3>
              <button type="button" onClick={() => setShowTaskModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Milestone Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Calibrate IoT sensor listener"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Priority Scale</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Assign Roster</label>
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
                  >
                    {MOCK_ACCOUNTS.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} ({user.role.substring(0, 2).toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0891b2] hover:bg-[#0e7490] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md mt-2"
              >
                Log Pipeline Milestone
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectTrackerView;
