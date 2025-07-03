
import { useState } from 'react';
import { MessageSquare, Send, Clock, Heart, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Discussion {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies: number;
  likes: number;
  isLiked: boolean;
}

interface DiscussionChannelProps {
  channel: {
    id: string;
    name: string;
    description: string;
    discussions: Discussion[];
    isPrivate?: boolean;
  };
  onUserClick: (userId: string) => void;
}

export const DiscussionChannel = ({ channel, onUserClick }: DiscussionChannelProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [discussions, setDiscussions] = useState(channel.discussions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('새 메시지:', newMessage);
      setNewMessage('');
    }
  };

  const handleLike = (discussionId: string) => {
    setDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
            isLiked: !discussion.isLiked
          };
        }
        return discussion;
      })
    );
  };

  // 공감순으로 정렬
  const sortedDiscussions = [...discussions].sort((a, b) => b.likes - a.likes);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-2">
          <h2 className="text-lg font-semibold text-gray-900">{channel.name}</h2>
          {channel.isPrivate && (
            <Badge variant="outline" className="text-xs">
              비공개
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-600">{channel.description}</p>
      </div>

      <div className="space-y-3">
        {sortedDiscussions.map((discussion) => (
          <Card key={discussion.id} className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-200 transition-colors"
                    onClick={() => onUserClick(discussion.author)}
                  >
                    <span className="text-sm font-medium text-teal-700">
                      {discussion.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span 
                      className="text-sm font-medium text-gray-900 cursor-pointer hover:text-teal-600"
                      onClick={() => onUserClick(discussion.author)}
                    >
                      {discussion.author}
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{discussion.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {discussion.replies}개 답글
                  </Badge>
                  {discussion.likes > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      ❤️ {discussion.likes}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700">{discussion.content}</p>
              <div className="mt-3 flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                  답글
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs flex items-center space-x-1 ${discussion.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                  onClick={() => handleLike(discussion.id)}
                >
                  <Heart className={`h-3 w-3 ${discussion.isLiked ? 'fill-current' : ''}`} />
                  <span>공감 {discussion.likes}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-gray-200">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              placeholder="토론에 참여해보세요..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-700">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
