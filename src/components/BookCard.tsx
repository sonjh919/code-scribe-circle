
import { Book, MessageSquare, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    description: string;
    category: string;
    participants: number;
    discussions: number;
    imageUrl?: string;
  };
  onClick: () => void;
}

export const BookCard = ({ book, onClick }: BookCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-gray-200"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex space-x-4">
          <div className="w-16 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
            {book.imageUrl ? (
              <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover rounded" />
            ) : (
              <Book className="h-8 w-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{book.author}</p>
            <Badge variant="secondary" className="mt-2 text-xs">
              {book.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {book.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{book.participants}명 참여</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageSquare className="h-3 w-3" />
            <span>{book.discussions}개 토론</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
