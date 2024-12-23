import * as signalR from "@microsoft/signalr";

const API_BASE_URL = 'https://localhost:7213/api';

// SignalR connection setup
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7213/chatHub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .withAutomaticReconnect()
  .build();

// Initialize SignalR connection
export const initializeSignalR = async () => {
  try {
    if (hubConnection.state === signalR.HubConnectionState.Disconnected) {
      await hubConnection.start();
      console.log("SignalR Connected");
    }
  } catch (err) {
    console.error("SignalR Connection Error:", err);
    setTimeout(initializeSignalR, 5000);
  }
};

// Subscribe to SignalR events
export const subscribeToMessages = (callback) => {
  hubConnection.on("ReceiveMessage", callback);
};

export const fetchConversations = async (userId) => {
  if (!userId) {
    throw new Error('User ID not found');
  }

  const response = await fetch(`${API_BASE_URL}/UserConversation/${userId}/conversations`, {
    headers: { accept: 'text/plain' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch conversations');
  }

  return response.json();
};

export const addMemberToConversation = async (conversationId, userId) => {
  if (!conversationId || !userId) {
    throw new Error('Conversation ID and User ID are required');
  }

  const response = await fetch(`${API_BASE_URL}/UserConversation/${conversationId}/add-member`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  
  const textResponse = await response.text();  // Get raw text first
  console.log("Raw response:", textResponse);  // Log raw response
  
  if (!response.ok) {
    throw new Error(textResponse);  // Use raw text as error message if not okay
  }
  
  const jsonResponse = JSON.parse(textResponse);  // Parse as JSON if okay
  return jsonResponse;
  
};

export const createConversation = async (name, ownerId) => {
  if (!name || !ownerId) {
    throw new Error('Conversation name and owner ID are required');
  }

  const response = await fetch(`${API_BASE_URL}/Conversation/create-conversation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, ownerId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create conversation');
  }

  const result = await response.json();
  
  // Notify through SignalR
  await hubConnection.invoke("SendMessage", "System", 
    `New conversation "${name}" created by ${ownerId}`);

  return result;
};

export const sendMessageToConversation = async (conversationId, userId, content) => {
  if (!conversationId || !userId || !content) {
    throw new Error('Conversation ID, User ID, and Message content are required');
  }

  const response = await fetch(`${API_BASE_URL}/Conversation/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conversationId,
      userId,
      content,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to send message');
  }

  await hubConnection.invoke("SendMessage", userId, content);

  return response.json();
};

export const fetchMessagesForConversation = async (conversationId, page = 1, pageSize = 10) => {
  if (!conversationId) {
    throw new Error('Conversation ID is required');
  }

  const response = await fetch(`${API_BASE_URL}/Conversation/${conversationId}/messages?page=${page}&pageSize=${pageSize}`, {
    headers: { 'accept': 'text/plain' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch messages');
  }

  return response.json();
};

export const searchUsers = async (query) => {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  const response = await fetch(`${API_BASE_URL}/User/search?username=${query}`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to search users');
  }

  return response.json();
};

export const loginUser = async (username) => {
  if (!username.trim()) {
    throw new Error('Username cannot be empty.');
  }

  const response = await fetch(`${API_BASE_URL}/User/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error('Login failed. Please try again.');
  }

  return response.json();
};

// Export the hubConnection for direct access if needed
export const signalRConnection = hubConnection;