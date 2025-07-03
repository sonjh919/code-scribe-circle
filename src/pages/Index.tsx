
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BookCard } from '@/components/BookCard';
import { BookDetail } from '@/components/BookDetail';
import { Badge } from '@/components/ui/badge';

const mockBooks = [
  {
    id: '1',
    title: '오브젝트: 코드로 이해하는 객체지향 설계',
    author: '조영호',
    description: '객체지향의 사실과 오해를 바로잡고, 진정한 객체지향 패러다임을 설명하는 책입니다.',
    category: '객체지향',
    participants: 234,
    discussions: 89,
    chapters: ['객체, 설계', '객체지향 프로그래밍', '역할, 책임, 협력']
  },
  {
    id: '2',
    title: '도메인 주도 설계',
    author: '에릭 에반스',
    description: '복잡한 소프트웨어의 핵심을 다루는 도메인 주도 설계에 대한 실용적인 접근법을 제시합니다.',
    category: '설계',
    participants: 178,
    discussions: 156,
    chapters: ['도메인 모델링', '모델 탐구', '모델 정제']
  },
  {
    id: '3',
    title: '자바의 정석',
    author: '남궁성',
    description: '자바 프로그래밍 언어를 체계적으로 학습할 수 있는 기본서입니다.',
    category: '프로그래밍 언어',
    participants: 445,
    discussions: 267,
    chapters: ['자바의 기초', '변수와 자료형', '연산자']
  },
  {
    id: '4',
    title: '클린 코드',
    author: '로버트 C. 마틴',
    description: '애자일 소프트웨어 장인 정신에 대한 가이드로, 깨끗한 코드를 작성하는 방법을 설명합니다.',
    category: '코드 품질',
    participants: 567,
    discussions: 234,
    chapters: ['깨끗한 코드', '의미 있는 이름', '함수']
  },
  {
    id: '5',
    title: '스프링 부트와 AWS로 혼자 구현하는 웹 서비스',
    author: '이동욱',
    description: '스프링 부트와 AWS를 활용하여 웹 서비스를 구현하는 실전 가이드입니다.',
    category: '웹 개발',
    participants: 289,
    discussions: 145,
    chapters: ['스프링 부트 시작하기', 'AWS 배포', '무중단 배포']
  },
  {
    id: '6',
    title: '리팩터링 2판',
    author: '마틴 파울러',
    description: '기존 코드를 개선하는 안전한 방법들을 체계적으로 정리한 리팩터링의 바이블입니다.',
    category: '코드 품질',
    participants: 198,
    discussions: 87,
    chapters: ['리팩터링 원칙', '코드에서 나는 악취', '테스트 구축하기']
  }
];

const categories = ['전체', '객체지향', '설계', '프로그래밍 언어', '코드 품질', '웹 개발'];

const Index = () => {
  const [selectedBook, setSelectedBook] = useState<typeof mockBooks[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedBook) {
    return <BookDetail book={selectedBook} onBack={() => setSelectedBook(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            개발자들을 위한 기술 서적 북클럽
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            좋은 기술 서적을 함께 읽고, 토론하며, 성장해보세요. 
            책을 기준으로 자동 생성되는 토론방에서 다양한 개발자들과 의견을 나누실 수 있습니다.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 ${
                selectedCategory === category 
                  ? 'bg-teal-600 hover:bg-teal-700' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* 검색 결과 */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              "{searchQuery}"에 대한 검색 결과 {filteredBooks.length}개
            </p>
          </div>
        )}

        {/* 인기 도서 섹션 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {searchQuery ? '검색 결과' : '인기 기술 서적'}
          </h2>
          
          {filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </div>
          )}
        </div>

        {/* 하단 정보 섹션 */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-teal-600 mb-2">1,200+</div>
              <div className="text-sm text-gray-600">등록된 기술 서적</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-600 mb-2">3,400+</div>
              <div className="text-sm text-gray-600">활성 사용자</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-600 mb-2">8,900+</div>
              <div className="text-sm text-gray-600">진행 중인 토론</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
