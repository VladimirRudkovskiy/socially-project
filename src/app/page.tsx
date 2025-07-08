import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div className="m-4">
			<SignedOut>
				<SignInButton mode="modal">
					<Button>
						Sign In
					</Button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
			<ModeToggle />
			<Button variant={"secondary"}>Click</Button>
		</div>
	);
}
