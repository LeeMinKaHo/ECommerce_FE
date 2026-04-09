import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import userApi from '@/service/UserService';
import { toast } from 'sonner';
import { UserSidebar } from '@/components/layout/UserSidebar';
import { User, Mail, MapPin, Save } from 'lucide-react';

export type UpdateUserFormFields = z.infer<typeof schema>;
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(6, 'Address must be at least 6 characters'),
});

export const AccountPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateUserFormFields>({ resolver: zodResolver(schema) });

  const [profileEmail, setProfileEmail] = useState('');
  const [initialData, setInitialData] = useState<UpdateUserFormFields>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userApi.getProfile();
        const { name, address, email } = res.data.data;
        const data = { name: name || '', address: address || '' };
        reset(data);
        setInitialData(data);
        setProfileEmail(email || '');
      } catch {
        const data = { name: '', address: '' };
        reset(data);
        setInitialData(data);
      }
    };
    fetchProfile();
  }, [reset]);

  const onSubmit: SubmitHandler<UpdateUserFormFields> = async (data) => {
    try {
      if (!initialData) return;
      const changedFields = Object.keys(data).reduce((acc, key) => {
        const k = key as keyof UpdateUserFormFields;
        if (data[k] !== initialData[k]) acc[k] = data[k];
        return acc;
      }, {} as Partial<UpdateUserFormFields>);

      if (Object.keys(changedFields).length === 0) {
        toast('No changes detected!');
        return;
      }
      await userApi.updateProfile(changedFields as UpdateUserFormFields);
      setInitialData(data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Update failed!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-primary">My Account</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and account security</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <UserSidebar />

          {/* Main */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Personal Profile</h2>
                  <p className="text-gray-400 text-xs">Update your display information</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* Email (readonly) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <Mail size={14} /> Email
                  </label>
                  <input
                    type="text"
                    value={profileEmail}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <User size={14} /> Full Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Enter your full name..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <MapPin size={14} /> Shipping Address
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    placeholder="Enter your address..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                    }`}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
                </div>

                <div className="flex justify-end pt-2 border-t border-gray-100">
                  <button
                    disabled={isSubmitting || !isDirty}
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    <Save size={16} />
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
