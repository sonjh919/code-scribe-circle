
import { useState } from 'react';
import { MessageSquare, Send, Clock } from 'lucide-react';
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
}

interface DiscussionChannelProps {
  channel: {
    id: string;
    name: string;
    description: string;
    discussions: Discussion[];
  };
}

export const DiscussionChannel = ({ channel }: DiscussionChannelProps) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('새 메시지:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{channel.name}</h2>
        <p className="text-sm text-gray-600">{channel.description}</p>
      </div>

      <div className="space-y-3">
        {channel.discussions.map((discussion) => (
          <Card key={discussion.id} className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-teal-700">
                      {discussion.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{discussion.author}</span>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{discussion.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {discussion.replies}개 답글
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700">{discussion.content}</p>
              <div className="mt-3 flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                  답글
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                  공감
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
