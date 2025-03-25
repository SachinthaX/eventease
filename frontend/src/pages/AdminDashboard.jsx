// src/pages/AdminDashboard.jsx
import {
    Box, Heading, Table, Thead, Tbody, Tr, Th, Td,
    Button, useToast, Spinner, Center, Tag, IconButton, HStack, Input, Flex,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
    FormControl, FormLabel, useDisclosure, Skeleton, SkeletonText
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import axios from '../services/axios';
  import { useAuth } from '../context/AuthContext';
  import { useNavigate } from 'react-router-dom';
  import { DeleteIcon, EditIcon, DownloadIcon, AddIcon } from '@chakra-ui/icons';
  import * as XLSX from 'xlsx';
  
  const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [editUser, setEditUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
    const [form, setForm] = useState({ name: '', email: '' });
  
    const toast = useToast();
    const navigate = useNavigate();
  
    const {
      isOpen: isEditOpen,
      onOpen: onEditOpen,
      onClose: onEditClose,
    } = useDisclosure();
  
    const {
      isOpen: isAddOpen,
      onOpen: onAddOpen,
      onClose: onAddClose,
    } = useDisclosure();
  
    useEffect(() => {
      if (!user?.token || user?.role !== 'admin') {
        navigate('/login');
        return;
      }
      fetchUsers();
    }, [user]);
  
    useEffect(() => {
      setFilteredUsers(
        users.filter(u =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, [search, users]);
  
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/users/admin', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(data);
      } catch (err) {
        toast({ title: 'Failed to fetch users', status: 'error' });
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete this user?')) return;
      try {
        await axios.delete(`/api/users/admin/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(users.filter(u => u._id !== id));
        toast({ title: 'User deleted', status: 'info' });
      } catch (err) {
        toast({ title: 'Delete failed', description: err.response?.data?.message, status: 'error' });
      }
    };
  
    const handleToggleRole = async (id, currentRole) => {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      try {
        const { data } = await axios.put(`/api/users/admin/${id}/role`, { role: newRole }, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(users.map(u => (u._id === id ? { ...u, role: data.role } : u)));
        toast({ title: `Role changed to ${data.role}`, status: 'success' });
      } catch (err) {
        toast({ title: 'Role update failed', description: err.response?.data?.message, status: 'error' });
      }
    };
  
    const handleExport = () => {
      const worksheet = XLSX.utils.json_to_sheet(users);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
      XLSX.writeFile(workbook, 'eventease_users.xlsx');
    };
  
    const handleEditOpen = (user) => {
      setEditUser(user);
      setForm({ name: user.name, email: user.email });
      onEditOpen();
    };
  
    const handleEditSubmit = async () => {
      try {
        const { data } = await axios.put(`/api/users/admin/${editUser._id}`, form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(users.map(u => (u._id === data._id ? data : u)));
        toast({ title: 'User updated', status: 'success' });
        onEditClose();
      } catch (err) {
        toast({ title: 'Edit failed', description: err.response?.data?.message, status: 'error' });
      }
    };
  
    const handleAddSubmit = async () => {
      try {
        const { data } = await axios.post('/api/users/admin', newUser, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers([...users, data]);
        toast({ title: 'User added', status: 'success' });
        setNewUser({ name: '', email: '', password: '', role: 'user' });
        onAddClose();
      } catch (err) {
        toast({ title: 'Add failed', description: err.response?.data?.message, status: 'error' });
      }
    };
  
    if (loading) {
        return (
          <Box maxW="6xl" mx="auto" mt={10} p={6}>
            <Skeleton height="40px" mb={4} />
            <SkeletonText mt="4" noOfLines={8} spacing="4" />
          </Box>
        );
      }
      

    return (
      <Box maxW="7xl" mx="auto" mt={10} p={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg" color="teal.600">Admin Dashboard - Users</Heading>
          <HStack spacing={4}>
            <Input placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} width="250px" />
            <Button colorScheme="green" onClick={onAddOpen} leftIcon={<AddIcon />}>Add User</Button>
            <Button colorScheme="blue" onClick={handleExport} leftIcon={<DownloadIcon />}>Export Excel</Button>
          </HStack>
        </Flex>
        <Heading size="md" mb={4}>
        Total Users: {users.length}
        </Heading>
  
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.map((u) => (
              <Tr key={u._id}>
                <Td>{u.name}</Td>
                <Td>{u.email}</Td>
                <Td>
                  <Tag colorScheme={u.role === 'admin' ? 'purple' : 'gray'}>{u.role}</Tag>
                </Td>
                <Td>
                  <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme={u.role === 'admin' ? 'gray' : 'purple'}
                    onClick={() => handleToggleRole(u._id, u.role)}
                    isDisabled={u._id === user._id} //  disable if current user
                    >
                    {u.role === 'admin' ? 'Demote' : 'Promote'}
                    </Button>
                    <IconButton icon={<EditIcon />} colorScheme="green" size="sm" aria-label="Edit user" onClick={() => handleEditOpen(u)} />
                    {u._id !== user._id && (
                      <IconButton icon={<DeleteIcon />} colorScheme="red" size="sm" onClick={() => handleDelete(u._id)} aria-label="Delete user" />
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
  
        {/* Edit User Modal */}
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>Save</Button>
              <Button variant="ghost" onClick={onEditClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  
        {/* Add User Modal */}
        <Modal isOpen={isAddOpen} onClose={onAddClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={handleAddSubmit}>Create</Button>
              <Button variant="ghost" onClick={onAddClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  };
  
  export default AdminDashboard;