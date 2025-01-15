import { cookies } from 'next/headers';

import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function Page() {
	const layout = cookies().get('react-resizable-panels:layout:mail');
	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

	return (
		<>
			<ResizablePanel
				defaultSize={defaultLayout ? defaultLayout[1] : 32}
				minSize={30}
			>
				<Tabs defaultValue="all">
					<div className="flex items-center px-4 py-2">
						<h1 className="text-xl font-bold">Inbox</h1>
						<TabsList className="ml-auto">
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
						</TabsList>
					</div>
					<Separator />
				</Tabs>
			</ResizablePanel>
			<ResizableHandle withHandle />
		</>
	);
}
