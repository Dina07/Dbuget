import React from 'react';
import { Layout } from './components/Common/Layout';
import { Dashboard } from './pages/Home';
import './styles/globals.css';

function App() {
  return (
    <Layout title="DBudget">
      <Dashboard />
    </Layout>
  );
}

export default App;
