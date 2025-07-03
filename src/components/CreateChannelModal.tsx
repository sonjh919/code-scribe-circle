
import { useState } from 'react';
import { X, Lock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChannel: (channelData: {
    name: string;
    description: string;
    isPrivate: boolean;
    password?: string;
  }) => void;
}

export const CreateChannelModal = ({ isOpen, onClose, onCreateChannel }: CreateChannelModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateChannel({
        name: name.trim(),
        description: description.trim(),
        isPrivate,
        password: isPrivate ? password : undefined
      });
      setName('');
      setDescription('');
      setIsPrivate(false);
      setPassword('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">새 토론방 만들기</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                토론방 이름
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="토론방 이름을 입력하세요"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="토론방에 대한 간단한 설명"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                공개 설정
              </label>
              
              <div className="space-y-2">
                <div 
                  className={`p-3 border rounded-lg cursor-pointer ${!isPrivate ? 'border-teal-500 bg-teal-50' : 'border-gray-300'}`}
                  onClick={() => setIsPrivate(false)}
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="font-medium text-sm">공개 토론방</div>
                      <div className="text-xs text-gray-500">누구나 참여할 수 있습니다</div>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`p-3 border rounded-lg cursor-pointer ${isPrivate ? 'border-teal-500 bg-teal-50' : 'border-gray-300'}`}
                  onClick={() => setIsPrivate(true)}
                >
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="font-medium text-sm">비공개 토론방</div>
                      <div className="text-xs text-gray-500">비밀번호가 필요합니다</div>
                    </div>
                  </div>
                </div>
              </div>

              {isPrivate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                취소
              </Button>
              <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700">
                만들기
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
