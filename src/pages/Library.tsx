
import { useState } from 'react';
import { ArrowLeft, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LibraryProps {
  onBack: () => void;
  onSelectBook: (bookId: string) => void;
}

const mockParticipatingBooks = [
  {
    id: '1',
    title: '오브젝트: 코드로 이해하는 객체지향 설계',
    author: '조영호',
    imageUrl: null,
    lastActivity: '2시간 전',
    unreadCount: 3
  },
  {
    id: '2',
    title: '도메인 주도 설계',
    author: '에릭 에반스',
    imageUrl: null,
    lastActivity: '1일 전',
    unreadCount: 0
  },
  {
    id: '4',
    title: '클린 코드',
    author: '로버트 C. 마틴',
    imageUrl: null,
    lastActivity: '3일 전',
    unreadCount: 7
  }
];

export const Library = ({ onBack, onSelectBook }: LibraryProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          돌아가기
        </Button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">내 서재</h1>
          <p className="text-gray-600">참여 중인 북클럽과 토론방을 확인하세요.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockParticipatingBooks.map((book) => (
            <Card 
              key={book.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-gray-200"
              onClick={() => onSelectBook(book.id)}
            >
              <CardContent className="p-4">
                <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center mb-3 relative">
                  {book.imageUrl ? (
                    <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover rounded" />
                  ) : (
                    <Book className="h-8 w-8 text-gray-400" />
                  )}
                  {book.unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {book.unreadCount}
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight mb-1">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                <p className="text-xs text-gray-500">{book.lastActivity}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockParticipatingBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">아직 참여 중인 북클럽이 없습니다.</p>
            <Button onClick={onBack} className="bg-teal-600 hover:bg-teal-700">
              북클럽 둘러보기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
