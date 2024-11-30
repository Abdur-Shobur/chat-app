'use client';
import { CreateTask, TaskAction, useTasksQuery } from '@/store/features/task';
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Page() {
	const { data } = useTasksQuery(undefined);
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<CardTitle>Tasks</CardTitle>

				{/* create Tasks modal  */}
				<CreateTask />
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{data?.map((task) => (
					<Card key={task.id} className="relative">
						<TaskAction task={task} />
						<CardHeader>
							<CardTitle>
								{task.title}{' '}
								<Badge
									className="capitalize"
									variant={
										task.status === 'pending'
											? 'default'
											: task.status === 'in-progress'
											? 'secondary'
											: 'outline'
									}
								>
									{task.status?.split('-').join(' ')}
								</Badge>
							</CardTitle>

							<pre className="text-lg font-sans">{task.description}</pre>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}
