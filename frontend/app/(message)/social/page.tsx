import { cookies } from 'next/headers';

import { ResizablePanel } from '@/components/ui/resizable';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import UserCard from './components/user-card-';

export default function Page() {
	const layout = cookies().get('react-resizable-panels:layout:mail');
	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

	return (
		<>
			<ResizablePanel
				defaultSize={defaultLayout[1]}
				minSize={30}
				className="!overflow-auto"
			>
				<Tabs defaultValue="all">
					<div className="flex items-center px-4 py-3">
						<h1 className="text-xl font-bold">Social</h1>
						{/* <TabsList className="ml-auto">
							<TabsTrigger
								value="all"
								className="text-zinc-600 dark:text-zinc-200"
							>
								All mail
							</TabsTrigger>
							<TabsTrigger
								value="unread"
								className="text-zinc-600 dark:text-zinc-200"
							>
								Unread
							</TabsTrigger>
						</TabsList> */}
					</div>
					<Separator />
					<div className="p-4">
						<UserCard
							name="Jane Doe"
							jobTitle="Full Stack Developer"
							bio="Passionate about creating beautiful and functional web applications. Love to learn and share knowledge with the community."
							avatarUrl="/placeholder.svg?height=96&width=96"
							followers={1234}
							following={567}
							projects={23}
						/>
					</div>
				</Tabs>
			</ResizablePanel>
		</>
	);
}
