'use client';
import React from 'react';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CreateUser, UserAction, useUsersQuery } from '@/store/features/user';

export default function Page() {
	const { data } = useUsersQuery(undefined);

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<CardTitle>Users</CardTitle>

				{/* create user modal  */}
				<CreateUser />
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{data?.map((user, i: number) => (
					<Card key={user.id} className="relative">
						{/* drop down action  */}
						<UserAction user={user} />

						{/* card content  */}
						<CardHeader>
							<CardTitle>User {i + 1}</CardTitle>
							<CardDescription>{user.username}</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}
