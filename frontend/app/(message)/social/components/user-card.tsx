import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserType } from '@/store/features/user';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UserCard({ ...props }: UserType) {
	const { createdAt, name, email, _id } = props;
	return (
		<Card className="w-full max-w-md  ">
			<CardHeader className="flex flex-col items-center space-y-4">
				<Avatar className="w-24 h-24">
					<AvatarImage src={undefined} alt={name} />
					<AvatarFallback>
						{name
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div className="text-center">
					<h2 className="text-2xl font-bold">{name}</h2>
					<p className="text-muted-foreground">{email}</p>
				</div>
			</CardHeader>
			<CardContent className="text-center">
				{/* <p className="text-sm text-muted-foreground ">{createdAt}</p> */}
				<div className="flex justify-center space-x-4 text-sm">
					<div>
						<p className="font-semibold">{createdAt}</p>
						<p className="text-muted-foreground">Join Date</p>
					</div>
					{/*
					 <div>
						<p className="font-semibold">{following}</p>
						<p className="text-muted-foreground">Following</p>
					</div>
					<div>
						<p className="font-semibold">{projects}</p>
						<p className="text-muted-foreground">Projects</p>
					</div> 
					*/}
				</div>
			</CardContent>
			<CardFooter className="flex justify-center">
				<Link href={`/inbox/${_id}`} className="text-muted-foreground">
					<Button>Send Message</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
