import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }

  return <AdminPanel />;
}