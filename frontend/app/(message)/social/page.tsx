import { cookies } from 'next/headers';

import { ResizablePanel } from '@/components/ui/resizable';
import { Tabs } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { UserList } from './components/user-list';

export default function Page() {
	const layout = cookies().get('react-resizable-panels:layout:mail');
	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

	return (
		<>
			<ResizablePanel
				defaultSize={defaultLayout ? defaultLayout[1] : 32}
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
						<UserList />
					</div>
				</Tabs>
			</ResizablePanel>
		</>
	);
}
