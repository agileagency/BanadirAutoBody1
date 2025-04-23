import { useState } from 'react';
import { Helmet } from 'react-helmet';
import BanadirMainIntegration from '@/components/admin/BanadirMainIntegration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, Users, MessageSquare, Settings } from 'lucide-react';

/**
 * Admin Dashboard Page
 * 
 * This page serves as the admin dashboard for managing various aspects of the system,
 * including the Banadir Main integration.
 */
const Admin = () => {
  const [activeTab, setActiveTab] = useState("banadir-main");
  
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Banadir Auto</title>
        <meta name="description" content="Admin dashboard for Banadir Auto Body Shop" />
      </Helmet>
      
      <div className="bg-primary text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Manage your site settings, integrations, and content
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="banadir-main" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                <span>Banadir Main</span>
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Customers</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Contact Submissions</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Overview</CardTitle>
                  <CardDescription>Site performance and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Coming soon...</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest site activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Coming soon...</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common admin tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Coming soon...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="banadir-main">
            <BanadirMainIntegration />
          </TabsContent>
          
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>Manage customer accounts and information</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Customer management functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Contact Submissions</CardTitle>
                <CardDescription>View and manage form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contact submission management functionality coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Admin;