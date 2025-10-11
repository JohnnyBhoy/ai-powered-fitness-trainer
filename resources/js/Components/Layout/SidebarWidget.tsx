import { BoxArrowLeft } from "react-bootstrap-icons";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <a
        href="https://tailadmin.com/pricing"
        target="_blank"
        rel="nofollow"
        className="flex items-center justify-center  gap-3 p-3 font-medium text-white rounded-lg bg-torq dark:bg-gray-800 dark:text-gray-300 text-theme-sm hover:bg-brand-600"
      >
        <BoxArrowLeft size={20} />
        Sign out
      </a>
    </div>
  );
}
