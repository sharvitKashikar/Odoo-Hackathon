import React, { useState, useEffect } from 'react';
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
import { questionsData } from './data/questionsData';
import { usersData } from './data/usersData';
import { tagsData } from './data/tagsData';
import { Question, User, Tag, Answer } from './types';

type ViewType = 'home' | 'questions' | 'question' | 'ask' | 'tags' | 'users' | 'profile';

interface UserVote {
  questionId: number;
  voteType: 'up' | 'down';
}

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>(questionsData);
  const [users, setUsers] = useState<User[]>(usersData);
  const [tags] = useState<Tag[]>(tagsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'active' | 'unanswered' | 'votes'>('newest');
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);

  useEffect(() => {
    // Auto-login for demo purposes
    setCurrentUser(users[0]);
    
    // Listen for profile navigation event
    const handleProfileNavigation = () => {
      if (currentUser) {
        setSelectedUser(currentUser);
        setCurrentView('profile');
      }
    };
    
    window.addEventListener('navigate-to-current-user-profile', handleProfileNavigation);
    
    return () => {
      window.removeEventListener('navigate-to-current-user-profile', handleProfileNavigation);
    };
  }, [users]);

  const handleQuestionClick = (question: Question) => {
    // Increment view count
    setQuestions(prev => prev.map(q => 
      q.id === question.id ? { ...q, views: q.views + 1 } : q
    ));
    setSelectedQuestion(question);
    setCurrentView('question');
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setCurrentView('profile');
  };

  const handleNavigateToQuestions = () => {
    setCurrentView('questions');
  };

  const handleAskQuestion = (newQuestion: Omit<Question, 'id' | 'createdAt' | 'votes' | 'answers' | 'views'>) => {
    const question: Question = {
      ...newQuestion,
      id: questions.length + 1,
      createdAt: new Date(),
      votes: 0,
      answers: 0,
      views: 0
    };
    setQuestions([question, ...questions]);
    setCurrentView('home');
  };

  const handleVoteQuestion = (questionId: number, voteType: 'up' | 'down') => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }

    // Check if user has already voted on this question
    const existingVote = userVotes.find(vote => 
      vote.questionId === questionId
    );

    // If user already voted the same way, remove the vote
    if (existingVote && existingVote.voteType === voteType) {
      setUserVotes(prev => prev.filter(vote => vote.questionId !== questionId));
      
      setQuestions(prev => prev.map(q => {
        if (q.id === questionId) {
          const newVotes = voteType === 'up' ? q.votes - 1 : q.votes + 1;
          return { ...q, votes: newVotes };
        }
        return q;
      }));

      if (selectedQuestion?.id === questionId) {
        setSelectedQuestion(prev => prev ? {
          ...prev,
          votes: voteType === 'up' ? prev.votes - 1 : prev.votes + 1
        } : null);
      }
      return;
    }

    // If user voted differently, change the vote
    if (existingVote && existingVote.voteType !== voteType) {
      setUserVotes(prev => prev.map(vote => 
        vote.questionId === questionId 
          ? { ...vote, voteType }
          : vote
      ));
      
      setQuestions(prev => prev.map(q => {
        if (q.id === questionId) {
          // Change from opposite vote to current vote (2 point swing)
          const newVotes = voteType === 'up' ? q.votes + 2 : q.votes - 2;
          return { ...q, votes: newVotes };
        }
        return q;
      }));

      if (selectedQuestion?.id === questionId) {
        setSelectedQuestion(prev => prev ? {
          ...prev,
          votes: voteType === 'up' ? prev.votes + 2 : prev.votes - 2
        } : null);
      }
      return;
    }

    // New vote
    setUserVotes(prev => [...prev, { questionId, voteType }]);
    
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        const newVotes = voteType === 'up' ? q.votes + 1 : q.votes - 1;
        return { ...q, votes: newVotes };
      }
      return q;
    }));

    if (selectedQuestion?.id === questionId) {
      setSelectedQuestion(prev => prev ? {
        ...prev,
        votes: voteType === 'up' ? prev.votes + 1 : prev.votes - 1
      } : null);
    }
  };

  const getUserVote = (questionId: number): 'up' | 'down' | null => {
    const vote = userVotes.find(vote => vote.questionId === questionId);
    return vote ? vote.voteType : null;
  };

  const handleAddAnswer = (questionId: number, answerText: string) => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }

    const newAnswer: Answer = {
      id: Date.now(),
      questionId,
      body: answerText,
      author: currentUser.name,
      authorId: currentUser.id,
      createdAt: new Date(),
      votes: 0,
      accepted: false
    };

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

  const handleLogin = (email: string, password: string) => {
    // Simple demo login - find user by email
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setShowLoginModal(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserVotes([]); // Clear votes when logging out
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={setCurrentView}
        currentUser={currentUser}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      
      <div className="max-w-7xl mx-auto flex">
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
        
        <main className="flex-1 p-6 bg-white border-l border-r border-gray-200">
          {currentView === 'home' && (
            <HomePage 
              onNavigateToQuestions={handleNavigateToQuestions}
              onAskQuestion={() => setCurrentView('ask')}
              recentQuestions={questions.slice(0, 5)}
              onQuestionClick={handleQuestionClick}
              currentUser={currentUser}
              onUserClick={handleUserClick}
              topContributors={users.slice().sort((a, b) => b.reputation - a.reputation)}
            />
          )}
          
          {currentView === 'questions' && (
            <QuestionsList 
              questions={filteredQuestions}
              onQuestionClick={handleQuestionClick}
              onAskQuestion={() => setCurrentView('ask')}
              onVote={handleVoteQuestion}
              currentUser={currentUser}
              sortBy={sortBy}
              onSortChange={setSortBy}
              getUserVote={getUserVote}
            />
          )}
          
          {currentView === 'question' && selectedQuestion && (
            <QuestionDetail 
              question={selectedQuestion}
              onBack={() => setCurrentView('home')}
              onVote={handleVoteQuestion}
              onAddAnswer={handleAddAnswer}
              currentUser={currentUser}
              onUserClick={handleUserClick}
              userVote={getUserVote(selectedQuestion.id)}
            />
          )}
          
          {currentView === 'ask' && (
            <AskQuestion 
              onSubmit={handleAskQuestion}
              onCancel={() => setCurrentView('home')}
              currentUser={currentUser}
            />
          )}

          {currentView === 'tags' && (
            <TagsPage 
              tags={tags}
              onTagClick={(tag) => {
                setSearchQuery(tag);
                setCurrentView('home');
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
              onBack={() => setCurrentView('questions')}
              onQuestionClick={handleQuestionClick}
              isCurrentUser={currentUser?.id === selectedUser.id}
            />
          )}
        </main>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          users={users}
        />
      )}
    </div>
  );
}

export default App;