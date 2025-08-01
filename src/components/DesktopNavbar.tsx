import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";
import { getUnreadNotificationStatus } from "@/actions/notification.action";
import Ping from "./Ping";
import { GetDbUserId } from "@/actions/user.action";

async function DesktopNavbar() {
  const user = await currentUser();

	let hasNewNotifications = false;

  if (user) {
    const dbUserId = await GetDbUserId();
    if (dbUserId) {
      hasNewNotifications = await getUnreadNotificationStatus(dbUserId);
    }
  }

	console.log("Has new notifications?", hasNewNotifications);

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
						<Link href="/notifications">
							<div className="relative">
								<BellIcon className="w-5 h-5" />
								{hasNewNotifications && (
									<div className="absolute -top-1 -right-1">
										<Ping />
									</div>
								)}
							</div>
							<span className="hidden lg:inline">Notifications</span>
						</Link>
					</Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}
export default DesktopNavbar;
