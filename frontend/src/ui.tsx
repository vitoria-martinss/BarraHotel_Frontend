import { ReactNode, useState, useEffect, useRef } from 'react';
import { STATUS_COLORS } from './data';


interface BadgeProps { label: string; className?: string }
export function Badge({ label, className }: BadgeProps) {
  const base = STATUS_COLORS[label] ?? 'bg-slate-100 text-slate-600';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${base} ${className ?? ''}`}>
      {label}
    </span>
  );
}

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
}
export function Button({ variant = 'primary', size = 'md', children, loading, className = '', ...props }: BtnProps) {
  const variants: Record<string, string> = {
    primary: 'bg-[#1B2B4B] text-white hover:bg-[#0E1825] active:scale-[0.98]',
    secondary: 'bg-[#B8963E] text-white hover:bg-[#9A7A2E] active:scale-[0.98]',
    outline: 'border border-[#1B2B4B] text-[#1B2B4B] hover:bg-[#EEF2F9] active:scale-[0.98]',
    ghost: 'text-[#1B2B4B] hover:bg-[#EEF2F9] active:scale-[0.98]',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
  };
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}
export function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
        <input
          className={`w-full px-3 py-2 ${icon ? 'pl-10' : ''} border rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B8963E]/50 focus:border-[#B8963E] transition-colors ${error ? 'border-red-400' : 'border-slate-200'} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}
export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <select
        className={`w-full px-3 py-2 border rounded-lg text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#B8963E]/50 focus:border-[#B8963E] transition-colors ${error ? 'border-red-400' : 'border-slate-200'} ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface CardProps { children: ReactNode; className?: string; onClick?: () => void }
export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-100 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
  sub?: string;
  trend?: { value: string; up: boolean };
}
export function StatCard({ label, value, icon, color = '#1B2B4B', sub, trend }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1" style={{ fontFamily: 'var(--font-display)' }}>{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
          {trend && (
            <p className={`text-xs font-medium mt-1 ${trend.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend.up ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const sizes: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 font-display">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}


interface PaginationProps {
  total: number;
  page: number;
  perPage: number;
  onChange: (page: number) => void;
}
export function Pagination({ total, page, perPage, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
      <p className="text-sm text-slate-500">
        {((page - 1) * perPage) + 1}–{Math.min(page * perPage, total)} de {total} registros
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors text-sm"
        >‹</button>
        {pages.map(p => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-[#1B2B4B] text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >{p}</button>
        ))}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors text-sm"
        >›</button>
      </div>
    </div>
  );
}


interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}
export function SearchBar({ value, onChange, placeholder = 'Pesquisar...', className = '' }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B8963E]/50 focus:border-[#B8963E]"
      />
    </div>
  );
}

interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}
interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  loading?: boolean;
}
export function Table<T>({ columns, data, emptyMessage = 'Nenhum registro encontrado', loading }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            {columns.map(col => (
              <th key={col.key} className={`text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide ${col.className ?? ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-slate-50">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-4 bg-slate-100 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>{emptyMessage}</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                {columns.map(col => (
                  <td key={col.key} className={`px-4 py-3 ${col.className ?? ''}`}>{col.render(row)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


interface AlertProps { type: 'success' | 'error' | 'warning' | 'info'; message: string; onClose?: () => void; className?: string }
export function Alert({ type, message, onClose, className = '' }: AlertProps) {
  const styles: Record<string, string> = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  const icons: Record<string, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };
  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${styles[type]} ${className}`}>
      <span className="font-bold text-sm">{icons[type]}</span>
      <p className="text-sm flex-1">{message}</p>
      {onClose && (
        <button onClick={onClose} className="text-current opacity-60 hover:opacity-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}


interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}
export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 border-b border-slate-200">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 border-b-2 -mb-px transition-colors ${active === tab.id ? 'border-[#B8963E] text-[#B8963E]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${active === tab.id ? 'bg-[#B8963E]/10 text-[#B8963E]' : 'bg-slate-100 text-slate-500'}`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}


interface EmptyStateProps { title: string; description?: string; action?: ReactNode }
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-700 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-400 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}


interface BreadcrumbItem { label: string; onClick?: () => void }
interface BreadcrumbProps { items: BreadcrumbItem[] }
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-slate-500 mb-5">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-slate-300">/</span>}
          {item.onClick ? (
            <button onClick={item.onClick} className="hover:text-[#1B2B4B] transition-colors">{item.label}</button>
          ) : (
            <span className="text-slate-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

interface DropdownItem { label: string; onClick: () => void; danger?: boolean; icon?: string }
interface DropdownProps { trigger: ReactNode; items: DropdownItem[] }
export function Dropdown({ trigger, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => { item.onClick(); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${item.danger ? 'text-red-600' : 'text-slate-700'}`}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
