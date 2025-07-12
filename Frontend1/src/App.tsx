import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { QuestionsList } from './components/QuestionsList';
import { QuestionDetail } from './components/QuestionDetail';
import { AskQuestion } from './components/AskQuestion';
import { TagsPage } from './components/TagsPage';
import { UsersPage } from './components/UsersPage';
import { UserProfile } from './components/UserProfile';
import { LoginModal } from './components/LoginModal';
import { questionsAPI, usersAPI, tagsAPI } from './services/api';
import { Question, User, Tag, Answer } from './types';

type ViewType = 'home' | 'questions' | 'question' | 'ask' | 'tags' | 'users' | 'profile';

interface UserVote {
  questionId: string;
  voteType: 'up' | 'down';
}

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'active' | 'unanswered' | 'votes'>('newest');
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [questionsData, usersData, tagsData] = await Promise.all([
          questionsAPI.getAll().catch(() => ({ questions: [] })),
          usersAPI.getAll().catch(() => []),
          tagsAPI.getAll().catch(() => [])
        ]);
        
        setQuestions(questionsData.questions || questionsData || []);
        setUsers(usersData || []);
        setTags(tagsData || []);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        // Set empty arrays as fallback
        setQuestions([]);
        setUsers([]);
        setTags([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleQuestionClick = async (question: Question) => {
    try {
      // Fetch full question details
      const questionData = await questionsAPI.getBySlug(question.slug || question.id.toString());
      setSelectedQuestion(questionData);
      setCurrentView('question');
    } catch (error) {
      console.error('Error fetching question details:', error);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setCurrentView('profile');
  };

  const handleNavigateToQuestions = () => {
    setCurrentView('questions');
  };

  const handleAskQuestion = async (newQuestion: Omit<Question, 'id' | 'createdAt' | 'votes' | 'answers' | 'views'>) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      const createdQuestion = await questionsAPI.create({
        title: newQuestion.title,
        description: newQuestion.body || '',
        tags: newQuestion.tags
      });
      
      setQuestions([createdQuestion, ...questions]);
      setCurrentView('home');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleVoteQuestion = async (questionId: string, voteType: 'up' | 'down') => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (voteType === 'up') {
        await questionsAPI.upvote(questionId);
      } else {
        await questionsAPI.downvote(questionId);
      }

      // Update local state
      setQuestions(prev => prev.map(q => {
        if (q.id === questionId) {
          const voteChange = voteType === 'up' ? 1 : -1;
          return { ...q, votes: q.votes + voteChange };
        }
        return q;
      }));

      if (selectedQuestion?.id === questionId) {
        setSelectedQuestion(prev => prev ? {
          ...prev,
          votes: prev.votes + (voteType === 'up' ? 1 : -1)
        } : null);
      }
    } catch (error) {
      console.error('Error voting on question:', error);
    }
  };

  const handleAddAnswer = async (questionId: string, answerText: string) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      const newAnswer = await answersAPI.create({
        content: answerText,
        questionId
      });

      // Update questions with new answer count
      setQuestions(prev => prev.map(q => 
        q.id === questionId ? { ...q, answers: q.answers + 1 } : q
      ));

      // Update selected question if it's the current one
      if (selectedQuestion?.id === questionId) {
        setSelectedQuestion(prev => prev ? {
          ...prev,
          answers: prev.answers + 1,
          answersList: [...(prev.answersList || []), newAnswer]
        } : null);
      }
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (question.body && question.body.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (sortBy === 'unanswered') {
      return matchesSearch && question.answers === 0;
    }
    
    return matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'votes':
        return b.votes - a.votes;
      case 'active':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const handleLogout = () => {
    logout();
    setUserVotes([]);
  };

  // Get top contributors (users sorted by reputation)
  const topContributors = users
    .sort((a, b) => (b.reputation || 0) - (a.reputation || 0))
    .slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={setCurrentView}
        currentUser={user}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      
      <div className="max-w-7xl mx-auto flex">
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
        
        <main className="flex-1 p-6">
          {currentView === 'home' && (
            <HomePage 
              questions={filteredQuestions.slice(0, 5)}
              onQuestionClick={handleQuestionClick}
              onNavigateToQuestions={handleNavigateToQuestions}
              onAskQuestion={() => setCurrentView('ask')}
              currentUser={user}
              onUserClick={handleUserClick}
              topContributors={topContributors}
              recentQuestions={filteredQuestions.slice(0, 3)}
            />
          )}
          
          {currentView === 'questions' && (
            <QuestionsList 
              questions={filteredQuestions}
              onQuestionClick={handleQuestionClick}
              onAskQuestion={() => setCurrentView('ask')}
              onVote={handleVoteQuestion}
              currentUser={user}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          )}
          
          {currentView === 'question' && selectedQuestion && (
            <QuestionDetail 
              question={selectedQuestion}
              onBack={() => setCurrentView('home')}
              onVote={handleVoteQuestion}
              onAddAnswer={handleAddAnswer}
              currentUser={user}
              onUserClick={handleUserClick}
            />
          )}
          
          {currentView === 'ask' && (
            <AskQuestion 
              onSubmit={handleAskQuestion}
              onCancel={() => setCurrentView('home')}
              currentUser={user}
            />
          )}

          {currentView === 'tags' && (
            <TagsPage 
              tags={tags}
              onTagClick={(tag) => {
                setSearchQuery(tag);
                setCurrentView('questions');
              }}
            />
          )}

          {currentView === 'users' && (
            <UsersPage 
              users={users}
              onUserClick={handleUserClick}
            />
          )}

          {currentView === 'profile' && selectedUser && (
            <UserProfile 
              user={selectedUser}
              questions={questions.filter(q => q.author === selectedUser.name)}
              onBack={() => setCurrentView('home')}
              onQuestionClick={handleQuestionClick}
              isCurrentUser={user?.id === selectedUser.id}
            />
          )}
        </main>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={(email, password) => {
            // Handle login through context
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;