import { Layout } from 'antd';
import AppHeader from './header';
import AppSidebar from './sidebar';
// import AppFooter from './footer';
import AppContent from './content';
import './index.css';

const AppLayout = () => {
	return (
		<Layout>
			<AppHeader />
			<Layout>
				<AppSidebar />
				<AppContent />
			</Layout>
			{/* <AppFooter /> */}
		</Layout>
	);
};

export default AppLayout