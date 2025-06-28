
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Phone, Mail, Building, Plus } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'prospect';
  lastContact: string;
}

const ClientContacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Smith',
      company: 'Tech Solutions Inc.',
      email: 'john.smith@techsolutions.com',
      phone: '+1-555-0123',
      status: 'active',
      lastContact: '2024-01-08'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'Marketing Pro',
      email: 'sarah@marketingpro.com',
      phone: '+1-555-0456',
      status: 'prospect',
      lastContact: '2024-01-05'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      company: 'Global Enterprises',
      email: 'mike.wilson@global.com',
      phone: '+1-555-0789',
      status: 'active',
      lastContact: '2024-01-07'
    },
    {
      id: '4',
      name: 'Lisa Brown',
      company: 'Creative Studio',
      email: 'lisa@creativestudio.com',
      phone: '+1-555-0321',
      status: 'inactive',
      lastContact: '2023-12-15'
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Client Contacts</h2>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Contact</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Contacts</CardTitle>
          <CardDescription>Find and manage your client contacts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>{contact.company}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{contact.phone}</span>
                    </div>
                    <p className="text-xs">Last contact: {new Date(contact.lastContact).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">No contacts found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientContacts;
