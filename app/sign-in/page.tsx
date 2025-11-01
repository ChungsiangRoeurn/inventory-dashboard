import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
      <div className="max-w-md w-full ">
        <SignIn />
        <Link href="/">Go Back Home</Link>
      </div>
    </div>
  );
}
