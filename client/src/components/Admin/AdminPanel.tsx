import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Shield,
  Folder,
  Users,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Calendar,
  Tag,
  UserPlus,
} from 'lucide-react';
import {
  OGDialog,
  OGDialogContent,
  OGDialogTitle,
} from '@librechat/client';
import { SystemRoles } from 'librechat-data-provider';
import { useAuthContext, useLocalize } from '~/hooks';
import {
  useAdminUsers,
  useAdminUsersSearch,
  useCreateAdminUser,
  useUpdateAdminUserRole,
} from '~/data-provider';
import UserWorkspacePanel from '../Nav/Workspaces/UserWorkspacePanel';

const PAGE_SIZE = 20;

interface AdminUserRowProps {
  user: {
    id: string;
    name: string;
    username?: string;
    email: string;
    avatar?: string;
    role: string;
    provider: string;
    createdAt?: string;
    workspaceSubdir?: string | null;
  };
  onClick: () => void;
  isSelected: boolean;
}

function AdminUserRow({ user, onClick, isSelected }: AdminUserRowProps) {
  const isAdmin = user.role === SystemRoles.ADMIN;
  const initial = (user.name || user.email || '?').charAt(0).toUpperCase();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
        isSelected
          ? 'bg-purple-600/10 border border-purple-500/30 dark:bg-purple-500/10'
          : 'hover:bg-surface-secondary border border-transparent'
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-sm font-semibold text-white">
            {initial}
          </div>
        )}
        {isAdmin && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500">
            <Shield className="size-2.5 text-white" />
          </span>
        )}
      </div>

      {/* User info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-text-primary">{user.name}</span>
          {isAdmin && (
            <span className="flex-shrink-0 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              ADMIN
            </span>
          )}
        </div>
        <div className="truncate text-xs text-text-secondary">{user.email}</div>
      </div>

      {/* Workspace badge */}
      {user.workspaceSubdir && (
        <div
          className="flex flex-shrink-0 items-center gap-1 rounded-md bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
          title={`Workspace: ${user.workspaceSubdir}`}
        >
          <Folder className="size-3" />
          <span className="max-w-[60px] truncate">{user.workspaceSubdir}</span>
        </div>
      )}
    </button>
  );
}

interface UserDetailPanelProps {
  user: {
    id: string;
    name: string;
    username?: string;
    email: string;
    avatar?: string;
    role: string;
    provider: string;
    createdAt?: string;
    updatedAt?: string;
    workspaceSubdir?: string | null;
  };
  onClose: () => void;
  onUserUpdate: () => void;
}

function UserDetailPanel({ user, onClose, onUserUpdate }: UserDetailPanelProps) {
  const updateRoleMutation = useUpdateAdminUserRole(user.id);
  const [role, setRole] = useState(user.role);
  const isAdmin = role === SystemRoles.ADMIN;
  const initial = (user.name || user.email || '?').charAt(0).toUpperCase();
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  React.useEffect(() => {
    setRole(user.role);
  }, [user.role]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    updateRoleMutation.mutate(newRole, {
      onSuccess: () => {
        onUserUpdate();
      },
      onError: (err: any) => {
        setRole(user.role);
        alert(err.message || 'Failed to update user role');
      },
    });
  };

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-text-secondary hover:bg-surface-secondary"
          aria-label="Back to user list"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold text-text-primary">User Details</span>
      </div>

      {/* User profile card */}
      <div className="rounded-xl border border-border-light bg-gradient-to-br from-purple-50 to-indigo-50 p-4 dark:from-purple-950/20 dark:to-indigo-950/20">
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-lg font-bold text-white">
              {initial}
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-base font-semibold text-text-primary">{user.name}</span>
              {isAdmin && (
                <span className="flex-shrink-0 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  <Shield className="size-3" />
                  Admin
                </span>
              )}
            </div>
            {user.username && (
              <div className="text-xs text-text-secondary">@{user.username}</div>
            )}
          </div>
        </div>
      </div>

      {/* Info fields */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-lg border border-border-light bg-surface-primary px-3 py-2">
          <Mail className="size-4 flex-shrink-0 text-text-secondary" />
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wide text-text-secondary">Email</div>
            <div className="text-sm text-text-primary">{user.email}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border-light bg-surface-primary px-3 py-2">
          <Shield className="size-4 flex-shrink-0 text-text-secondary" />
          <div className="flex-1">
            <div className="text-[10px] font-medium uppercase tracking-wide text-text-secondary">Role</div>
            <select
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
              disabled={updateRoleMutation.isLoading}
              className="mt-0.5 block w-full rounded border-0 bg-transparent p-0 text-sm font-medium text-text-primary focus:ring-0 focus:outline-none focus:ring-transparent focus:border-transparent select-none cursor-pointer"
            >
              <option value="USER" className="bg-surface-primary text-text-primary">User</option>
              <option value="ADMIN" className="bg-surface-primary text-text-primary">Admin</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border-light bg-surface-primary px-3 py-2">
          <Tag className="size-4 flex-shrink-0 text-text-secondary" />
          <div>
            <div className="text-[10px] font-medium uppercase tracking-wide text-text-secondary">Provider</div>
            <div className="text-sm capitalize text-text-primary">{user.provider}</div>
          </div>
        </div>

        {joinDate && (
          <div className="flex items-center gap-2 rounded-lg border border-border-light bg-surface-primary px-3 py-2">
            <Calendar className="size-4 flex-shrink-0 text-text-secondary" />
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wide text-text-secondary">Member since</div>
              <div className="text-sm text-text-primary">{joinDate}</div>
            </div>
          </div>
        )}
      </div>

      {/* Workspace panel */}
      <div className="mt-2">
        <UserWorkspacePanel userId={user.id} />
      </div>
    </div>
  );
}

interface CreateUserPanelProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
}

function CreateUserPanel({ onClose, onSuccess }: CreateUserPanelProps) {
  const createUserMutation = useCreateAdminUser();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [workspaceSubdir, setWorkspaceSubdir] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError('Name, email, and password are required');
      return;
    }
    createUserMutation.mutate(
      {
        name,
        username: username || undefined,
        email,
        password,
        role,
        workspaceSubdir: workspaceSubdir.trim() || null,
      },
      {
        onSuccess: (newUser) => {
          onSuccess(newUser);
        },
        onError: (err: any) => {
          setError(err.message || 'Failed to create user');
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-text-secondary hover:bg-surface-secondary"
          aria-label="Cancel"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold text-text-primary">Create New User</span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {error && (
          <div className="rounded-lg bg-red-100 p-3 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-text-secondary">Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="h-9 w-full rounded-lg border border-border-light bg-surface-secondary px-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-text-secondary">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            className="h-9 w-full rounded-lg border border-border-light bg-surface-secondary px-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-text-secondary">Email Address *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="h-9 w-full rounded-lg border border-border-light bg-surface-secondary px-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-text-secondary">Password *</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-9 w-full rounded-lg border border-border-light bg-surface-secondary px-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-text-secondary">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-9 w-full rounded-lg border border-border-light bg-surface-secondary px-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-text-secondary">Workspace Subdirectory</label>
          <input
            type="text"
            value={workspaceSubdir}
            onChange={(e) => setWorkspaceSubdir(e.target.value)}
            placeholder="e.g. john"
            className="h-9 w-full rounded-lg border border-border-light bg-surface-secondary px-3 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <p className="text-[10px] text-text-secondary">Optional directory relative to containerBasePath.</p>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-border-light pt-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-border-light px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={createUserMutation.isLoading}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {createUserMutation.isLoading ? 'Creating...' : 'Create User'}
        </button>
      </div>
    </form>
  );
}

interface AdminPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminPanel({ open, onOpenChange }: AdminPanelProps) {
  const { user: currentUser } = useAuthContext();
  const localize = useLocalize();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const isSearching = searchQuery.trim().length >= 2;

  const usersQuery = useAdminUsers(
    { limit: PAGE_SIZE, offset: page * PAGE_SIZE },
    { enabled: !isSearching },
  );

  const searchQuery$ = useAdminUsersSearch(searchQuery.trim(), {
    enabled: isSearching,
  });

  const displayedUsers = useMemo(() => {
    if (isSearching) {
      return (searchQuery$.data?.users ?? []).map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        username: u.username,
        avatar: u.avatarUrl,
        role: 'USER',
        provider: 'local',
        workspaceSubdir: null,
      }));
    }
    return usersQuery.data?.users ?? [];
  }, [isSearching, searchQuery$.data, usersQuery.data]);

  const totalUsers = usersQuery.data?.total ?? 0;
  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  const selectedUserData = useMemo(
    () => displayedUsers.find((u) => u.id === selectedUser) ?? null,
    [displayedUsers, selectedUser],
  );

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedUser(null);
      setSearchQuery('');
      setPage(0);
      setIsCreating(false);
    }
    onOpenChange(isOpen);
  };

  const isLoading = isSearching ? searchQuery$.isLoading : usersQuery.isLoading;

  if (currentUser?.role !== SystemRoles.ADMIN) {
    return null;
  }

  return (
    <OGDialog open={open} onOpenChange={handleOpenChange}>
      <OGDialogContent className="flex h-[90vh] max-h-[720px] w-[95vw] max-w-3xl flex-col gap-0 overflow-hidden border-border-light bg-surface-primary p-0 text-text-primary">
        {/* Dialog header */}
        <div className="flex flex-shrink-0 items-center gap-3 border-b border-border-light bg-gradient-to-r from-purple-600/5 to-transparent px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-700">
            <Shield className="size-4 text-white" />
          </div>
          <div>
            <OGDialogTitle className="text-base font-semibold text-text-primary">
              Admin Panel
            </OGDialogTitle>
            <p className="text-xs text-text-secondary">User &amp; Workspace Management</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left panel — user list */}
          <div className="flex w-64 flex-shrink-0 flex-col border-r border-border-light">
            {/* Search and Add User */}
            <div className="flex flex-shrink-0 items-center gap-2 p-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(0);
                    setSelectedUser(null);
                    setIsCreating(false);
                  }}
                  placeholder="Search users..."
                  className="h-8 w-full rounded-lg border border-border-light bg-surface-secondary pl-8 pr-3 text-xs text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedUser(null);
                  setIsCreating(true);
                }}
                title="Add New User"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-light bg-surface-secondary text-text-secondary hover:bg-surface-tertiary hover:text-text-primary"
              >
                <UserPlus className="size-4" />
              </button>
            </div>

            {/* Users list */}
            <div className="flex-1 overflow-y-auto px-2 py-1">
              {isLoading ? (
                <div className="flex h-24 items-center justify-center">
                  <div className="size-5 animate-spin rounded-full border-2 border-border-light border-t-purple-500" />
                </div>
              ) : displayedUsers.length === 0 ? (
                <div className="flex h-24 flex-col items-center justify-center gap-2 text-text-secondary">
                  <Users className="size-5" />
                  <span className="text-xs">
                    {isSearching ? 'No users found' : 'No users'}
                  </span>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {displayedUsers.map((u) => (
                    <AdminUserRow
                      key={u.id}
                      user={u}
                      isSelected={selectedUser === u.id}
                      onClick={() => {
                        setIsCreating(false);
                        setSelectedUser(u.id === selectedUser ? null : u.id);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {!isSearching && totalPages > 1 && (
              <div className="flex flex-shrink-0 items-center justify-between border-t border-border-light px-3 py-2">
                <span className="text-[10px] text-text-secondary">
                  {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, totalUsers)} of {totalUsers}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="rounded p-0.5 text-text-secondary hover:bg-surface-secondary disabled:opacity-40"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="rounded p-0.5 text-text-secondary hover:bg-surface-secondary disabled:opacity-40"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Footer stat */}
            {!isSearching && (
              <div className="flex-shrink-0 border-t border-border-light px-3 py-2">
                <span className="text-[10px] text-text-secondary">
                  {totalUsers} total user{totalUsers !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Right panel — user details or create panel */}
          <div className="flex-1 overflow-y-auto p-4">
            {isCreating ? (
              <CreateUserPanel
                onClose={() => setIsCreating(false)}
                onSuccess={(newUser) => {
                  setIsCreating(false);
                  usersQuery.refetch();
                  setSelectedUser(newUser.id);
                }}
              />
            ) : selectedUserData ? (
              <UserDetailPanel
                user={selectedUserData}
                onClose={() => setSelectedUser(null)}
                onUserUpdate={() => usersQuery.refetch()}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-text-secondary">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-secondary">
                  <User className="size-7" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Select a user</p>
                  <p className="text-xs">Click a user from the list to view and manage their details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </OGDialogContent>
    </OGDialog>
  );
}
