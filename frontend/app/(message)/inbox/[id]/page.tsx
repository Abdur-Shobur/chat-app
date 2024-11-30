import { cookies } from 'next/headers';

import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MailList } from '../../components/mail-list';
import { mails } from '../../data';
import { MailDisplay } from '../../components/mail-display';

export default function MailPage({ params }: { params: { id: string } }) {
	const { id } = params;
	const layout = cookies().get('react-resizable-panels:layout:mail');
	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

	return (
		<>
			<MailDisplay mail={mails.find((item) => item.id === id) || null} />
		</>
	);
}
