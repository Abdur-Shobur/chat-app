import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserCardProps {
	name: string;
	jobTitle: string;
	bio: string;
	avatarUrl: string;
	followers: number;
	following: number;
	projects: number;
}

export default function UserCard2({
	name,
	jobTitle,
	bio,
	avatarUrl,
	followers,
	following,
	projects,
}: UserCardProps) {
	return (
		<Card className="w-full max-w-md  ">
			<CardHeader className="flex flex-col items-center space-y-4">
				<Avatar className="w-24 h-24">
					<AvatarImage src={avatarUrl} alt={name} />
					<AvatarFallback>
						{name
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div className="text-center">
					<h2 className="text-2xl font-bold">{name}</h2>
					<p className="text-muted-foreground">{jobTitle}</p>
				</div>
			</CardHeader>
			<CardContent className="text-center">
				<p className="text-sm text-muted-foreground mb-4">{bio}</p>
				<div className="flex justify-center space-x-4 text-sm">
					<div>
						<p className="font-semibold">{followers}</p>
						<p className="text-muted-foreground">Followers</p>
					</div>
					<div>
						<p className="font-semibold">{following}</p>
						<p className="text-muted-foreground">Following</p>
					</div>
					<div>
						<p className="font-semibold">{projects}</p>
						<p className="text-muted-foreground">Projects</p>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-center">
				<Button>Follow</Button>
			</CardFooter>
		</Card>
	);
}
