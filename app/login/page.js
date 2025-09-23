'use client';

import Header from '../components/Header';
import Button from '../components/ui/Button';

export default function LoginLanding() {
  return (
    <div className="min-h-screen bg-[#E3F3FF] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <img src="/images/login_student.svg" alt="Illustration" className="w-[694px] h-[469.39px]" />
            </div>
          </div>
          <div className="text-center xl:text-left xl:ml-[101px]">
            <div className="w-full max-w-[480px] mx-auto xl:mx-0 bg-white rounded-2xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] p-8 xl:p-12">
              <div className="space-y-4">
                <h1 className="text-[36px] font-extrabold text-[#398AC8] uppercase leading-[46px]">Welcome</h1>
                <h2 className="text-[36px] font-extrabold text-[#202244] uppercase leading-[46px]">to Takespace Teacher</h2>
                <p className="text-[16px] leading-[24px] text-[#475569] font-medium">Sign in to continue to your dashboard</p>
              </div>
              <div className="space-y-4 mt-8">
                <Button
                  useCustomClasses={true}
                  className="w-full h-12 flex items-center justify-center gap-2 bg-white border-[1.5px] border-[#CBD5E1] rounded-xl font-semibold text-sm text-[#334155] hover:bg-gray-50 transition-colors"
                  onClick={() => window.location.href = '/auth'}
                >
                  <img src="/icons/email.svg" alt="Email" className="w-5 h-5" />
                  <span className="whitespace-nowrap">Continue with username</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
