
import { useState } from 'react';
import { Book, Users, MessageSquare, ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DiscussionChannel } from './DiscussionChannel';

interface BookDetailProps {
  book: {
    id: string;
    title: string;
    author: string;
    description: string;
    category: string;
    participants: number;
    discussions: number;
    chapters: string[];
  };
  onBack: () => void;
}

const mockChannels = [
  {
    id: '1',
    name: '전체 토론',
    description: '책 전반에 대한 자유로운 토론 공간입니다.',
    discussions: [
      {
        id: '1',
        author: '정현우',
        content: '이 책의 핵심 개념 중에서 가장 실무에 적용하기 어려웠던 부분이 있나요? 저는 특히 도메인 모델링 부분에서 고민이 많았습니다.',
        timestamp: '2시간 전',
        replies: 5
      },
      {
        id: '2',
        author: '김하린',
        content: '책에서 나온 예시 코드를 실제로 구현해보려고 하는데, 환경 설정 부분에서 막혔습니다. 도움 받을 수 있을까요?',
        timestamp: '4시간 전',
        replies: 3
      }
    ]
  },
  {
    id: '2',
    name: '1장: 객체, 설계',
    description: '첫 번째 장에 대한 토론입니다.',
    discussions: [
      {
        id: '3',
        author: '박민수',
        content: '캡슐화와 응집도 개념이 실제 코드에서는 어떻게 구현되는지 궁금합니다. 실무 예시가 있으면 공유해주세요!',
        timestamp: '1일 전',
        replies: 8
      }
    ]
  }
];

export const BookDetail = ({ book, onBack }: BookDetailProps) => {
  const [selectedChannel, setSelectedChannel] = useState(mockChannels[0]);
  const [isJoined, setIsJoined] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        돌아가기
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 책 정보 */}
        <div className="lg:col-span-1">
          <Card className="border-gray-200 sticky top-24">
            <CardHeader>
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Book className="h-16 w-16 text-gray-400" />
              </div>
              <CardTitle className="text-lg font-bold text-gray-900">{book.title}</CardTitle>
              <p className="text-sm text-gray-600">{book.author}</p>
              <Badge variant="secondary" className="w-fit">{book.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">{book.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">참여자</span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{book.participants}명</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">토론</span>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span>{book.discussions}개</span>
                  </div>
                </div>
              </div>

              <Button 
                className={`w-full ${isJoined ? 'bg-gray-600 hover:bg-gray-700' : 'bg-teal-600 hover:bg-teal-700'}`}
                onClick={() => setIsJoined(!isJoined)}
              >
                {isJoined ? '참여 중' : '북클럽 참여하기'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 토론 채널 목록 및 내용 */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 채널 목록 */}
            <div className="lg:col-span-1">
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">토론 채널</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {mockChannels.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                          selectedChannel.id === channel.id ? 'bg-teal-50 border-r-2 border-teal-600' : ''
                        }`}
                      >
                        <div className="font-medium text-gray-900">{channel.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {channel.discussions.length}개 토론
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 선택된 채널의 토론 내용 */}
            <div className="lg:col-span-3">
              <DiscussionChannel channel={selectedChannel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
