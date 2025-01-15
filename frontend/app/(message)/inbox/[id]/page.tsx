import { mails } from '../../data';
import { MailDisplay } from '../../components/mail-display';
import MailDisplaySocket from '../../components/mail-display-socket';

export default function MailPage({ params }: { params: { id: string } }) {
	const { id } = params;

	return (
		<>
			<MailDisplaySocket />
			<MailDisplay mail={mails.find((item) => item.id === id) || null} />
		</>
	);
}
