
import { useState } from 'react';
import { ArrowLeft, Book, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProfileProps {
  userId: string;
  onBack: () => void;
  onSelectBook: (bookId: string) => void;
}

const mockUserData = {
  name: '김하린',
  role: '프론트엔드 개발자',
  joinDate: '2024년 1월',
  totalDiscussions: 45,
  participatingBooks: [
    {
      id: '3',
      title: '자바의 정석',
      author: '남궁성',
      imageUrl: null
    },
    {
      id: '1',
      title: '오브젝트: 코드로 이해하는 객체지향 설계',
      author: '조영호',
      imageUrl: null
    }
  ]
};

export const Profile = ({ userId, onBack, onSelectBook }: ProfileProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          돌아가기
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 프로필 정보 */}
          <div className="lg:col-span-1">
            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-teal-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {mockUserData.name}
                </CardTitle>
                <p className="text-sm text-gray-600">{mockUserData.role}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">가입일</span>
                    <span className="font-medium">{mockUserData.joinDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">총 토론 참여</span>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3 text-gray-400" />
                      <span className="font-medium">{mockUserData.totalDiscussions}회</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">참여 중인 책</span>
                    <div className="flex items-center space-x-1">
                      <Book className="h-3 w-3 text-gray-400" />
                      <span className="font-medium">{mockUserData.participatingBooks.length}권</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 참여 중인 책들 */}
          <div className="lg:col-span-2">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">참여 중인 북클럽</CardTitle>
              </CardHeader>
              <CardContent>
                {mockUserData.participatingBooks.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mockUserData.participatingBooks.map((book) => (
                      <div
                        key={book.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg p-3"
                        onClick={() => onSelectBook(book.id)}
                      >
                        <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center mb-2">
                          {book.imageUrl ? (
                            <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover rounded" />
                          ) : (
                            <Book className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <h3 className="font-medium text-xs text-gray-900 line-clamp-2 leading-tight mb-1">
                          {book.title}
                        </h3>
                        <p className="text-xs text-gray-600">{book.author}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Book className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">참여 중인 북클럽이 없습니다.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
