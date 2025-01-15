'use client';
import React from 'react';
import UserCard from './user-card';
import { useUsersQuery } from '@/store/features/user';

export function UserList() {
	const { data } = useUsersQuery(undefined);
	console.log(data);
	return (
		<div className="grid grid-cols-4 gap-4">
			{data?.data?.map((user) => (
				<UserCard key={user._id} {...user} />
			))}
			{/* <UserCard
				name="Jane Doe"
				jobTitle="Full Stack Developer"
				bio="Passionate about creating beautiful and functional web applications. Love to learn and share knowledge with the community."
				avatarUrl="/placeholder.svg?height=96&width=96"
			/> */}
		</div>
	);
}
