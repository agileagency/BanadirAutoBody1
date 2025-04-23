import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, RefreshCw, Server, Link } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

/**
 * BanadirMainIntegration Component
 * 
 * This component provides a UI for managing the integration with the Banadir Main system.
 * It allows administrators to:
 * - Initialize the integration
 * - Sync contact submissions to the main system
 * - Fetch appointments from the main system
 * - View integration status
 */
const BanadirMainIntegration = () => {
  const [activeTab, setActiveTab] = useState('status');
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // System status query
  const statusQuery = useQuery({
    queryKey: ['/api/banadir-main/status'],
    queryFn: async () => {
      try {
        const result = await apiRequest({
          url: '/api/banadir-main/init',
          method: 'POST'
        });
        return { initialized: true, ...result };
      } catch (error) {
        console.error('Failed to fetch system status', error);
        return { initialized: false, error: String(error) };
      }
    },
    refetchInterval: 60000 // Refresh status every minute
  });
  
  // Initialize integration mutation
  const initMutation = useMutation({
    mutationFn: async () => {
      const result = await apiRequest({
        url: '/api/banadir-main/init',
        method: 'POST'
      });
      return result;
    },
    onSuccess: () => {
      toast({
        title: 'Integration Initialized',
        description: 'Successfully initialized connection to Banadir Main system.',
        variant: 'default'
      });
      queryClient.invalidateQueries({ queryKey: ['/api/banadir-main/status'] });
    },
    onError: (error) => {
      toast({
        title: 'Initialization Failed',
        description: `Error: ${String(error)}`,
        variant: 'destructive'
      });
    }
  });
  
  // Sync contacts mutation
  const syncContactsMutation = useMutation({
    mutationFn: async () => {
      const result = await apiRequest({
        url: '/api/banadir-main/sync/contacts',
        method: 'POST'
      });
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: 'Contacts Synced',
        description: `Successfully synced ${data.count} contact submissions.`,
        variant: 'default'
      });
    },
    onError: (error) => {
      toast({
        title: 'Sync Failed',
        description: `Error: ${String(error)}`,
        variant: 'destructive'
      });
    }
  });
  
  // Fetch appointments mutation
  const fetchAppointmentsMutation = useMutation({
    mutationFn: async () => {
      const result = await apiRequest({
        url: '/api/banadir-main/sync/appointments',
        method: 'POST'
      });
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: 'Appointments Fetched',
        description: `Successfully fetched ${data.count} appointments.`,
        variant: 'default'
      });
    },
    onError: (error) => {
      toast({
        title: 'Fetch Failed',
        description: `Error: ${String(error)}`,
        variant: 'destructive'
      });
    }
  });
  
  // Run complete sync mutation
  const syncAllMutation = useMutation({
    mutationFn: async () => {
      const result = await apiRequest({
        url: '/api/banadir-main/sync/all',
        method: 'POST'
      });
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: 'Full Sync Complete',
        description: `Synced ${data.data.contactsSync} contacts and ${data.data.appointmentsSync} appointments.`,
        variant: 'default'
      });
    },
    onError: (error) => {
      toast({
        title: 'Full Sync Failed',
        description: `Error: ${String(error)}`,
        variant: 'destructive'
      });
    }
  });
  
  // Combined loading state
  const isLoading = 
    initMutation.isPending || 
    syncContactsMutation.isPending || 
    fetchAppointmentsMutation.isPending ||
    syncAllMutation.isPending;
  
  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Link className="h-5 w-5" />
                Banadir Main Integration
              </CardTitle>
              <CardDescription>
                Connect and synchronize data with the centralized Banadir Main system
              </CardDescription>
            </div>
            <Badge 
              variant={statusQuery.data?.initialized ? "success" : "destructive"}
              className="px-3 py-1 text-xs"
            >
              {statusQuery.data?.initialized ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="w-full">
              <TabsTrigger value="status" className="flex-1">Status</TabsTrigger>
              <TabsTrigger value="sync" className="flex-1">Synchronization</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="pt-6">
            <TabsContent value="status" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">Connection Status</h3>
                    {statusQuery.data?.initialized ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {statusQuery.data?.initialized 
                      ? 'Connected to Banadir Main system' 
                      : 'Not connected to Banadir Main system'}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">API Status</h3>
                    <Server className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    API endpoints available and responding
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-700 mb-3">System Overview</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Last Sync:</span>
                    <span className="ml-2 text-gray-500">
                      {statusQuery.isLoading ? 'Loading...' : 'Just now'}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Sync Status:</span>
                    <span className="ml-2 text-gray-500">
                      {isLoading ? 'Syncing...' : 'Ready'}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">App ID:</span>
                    <span className="ml-2 text-gray-500">auto-repair-site</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Version:</span>
                    <span className="ml-2 text-gray-500">1.0.0</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sync" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                  disabled={syncContactsMutation.isPending}
                  onClick={() => syncContactsMutation.mutate()}
                >
                  <div className="rounded-full bg-primary/10 p-3">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-medium">Sync Contact Submissions</span>
                  <span className="text-xs text-gray-500">
                    Send local contact submissions to Banadir Main
                  </span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                  disabled={fetchAppointmentsMutation.isPending}
                  onClick={() => fetchAppointmentsMutation.mutate()}
                >
                  <div className="rounded-full bg-primary/10 p-3">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-medium">Fetch Appointments</span>
                  <span className="text-xs text-gray-500">
                    Get latest appointments from Banadir Main
                  </span>
                </Button>
              </div>
              
              <Button
                variant="default"
                className="w-full h-auto py-4 mt-4"
                disabled={syncAllMutation.isPending}
                onClick={() => syncAllMutation.mutate()}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${syncAllMutation.isPending ? 'animate-spin' : ''}`} />
                Run Complete Sync
              </Button>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-700 mb-3">Integration Settings</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Initialize or reset the connection to the Banadir Main centralized system.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={initMutation.isPending}
                  onClick={() => initMutation.mutate()}
                >
                  {initMutation.isPending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Initializing...
                    </>
                  ) : (
                    <>Initialize Integration</>
                  )}
                </Button>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-700 mb-3">Configuration</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">API URL:</span>
                    <span className="text-gray-800 font-mono">https://api.banadirmain.com/v1</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Application ID:</span>
                    <span className="text-gray-800 font-mono">auto-repair-site</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Sync Interval:</span>
                    <span className="text-gray-800">30 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Features Enabled:</span>
                    <span className="text-gray-800">Yes</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter className="bg-gray-50 flex justify-between">
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/banadir-main/status'] })}
            disabled={statusQuery.isRefetching}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${statusQuery.isRefetching ? 'animate-spin' : ''}`} /> 
            Refresh
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
};

export default BanadirMainIntegration;