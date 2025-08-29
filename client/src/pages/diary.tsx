import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { DiaryEntry, Memo } from "@shared/schema";
import DiaryEntryForm from "@/components/diary-entry-form";
import DiaryList from "@/components/diary-list";
import DiaryContent from "@/components/diary-content";
import MemoSidebar from "@/components/memo-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

type ViewMode = "list" | "content" | "form";

export default function DiaryPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const { data: entries = [], isLoading: entriesLoading } = useQuery<DiaryEntry[]>({
    queryKey: ["/api/diary-entries"],
  });

  const { data: searchResults = [] } = useQuery<DiaryEntry[]>({
    queryKey: ["/api/diary-entries/search", { q: searchQuery }],
    enabled: searchQuery.length > 0,
  });

  const { data: memos = [] } = useQuery<Memo[]>({
    queryKey: ["/api/memos"],
  });

  const createEntryMutation = useMutation({
    mutationFn: async (entry: { title: string; content: string; emotion: string }) => {
      const response = await apiRequest("POST", "/api/diary-entries", entry);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/diary-entries"] });
      setViewMode("list");
    },
  });

  const createMemoMutation = useMutation({
    mutationFn: async (memo: { content: string }) => {
      const response = await apiRequest("POST", "/api/memos", memo);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/memos"] });
    },
  });

  const deleteEntryMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/diary-entries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/diary-entries"] });
      setViewMode("list");
      setSelectedEntry(null);
    },
  });

  const deleteMemoMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/memos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/memos"] });
    },
  });

  const handleEntryClick = (entry: DiaryEntry) => {
    setSelectedEntry(entry);
    setViewMode("content");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedEntry(null);
  };

  const handleNewEntry = () => {
    setViewMode("form");
  };

  const handleCancelForm = () => {
    setViewMode("list");
  };

  const handleSubmitEntry = (entry: { title: string; content: string; emotion: string }) => {
    createEntryMutation.mutate(entry);
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm("정말로 이 일기를 삭제하시겠습니까?")) {
      deleteEntryMutation.mutate(id);
    }
  };

  const handleCreateMemo = (content: string) => {
    createMemoMutation.mutate({ content });
  };

  const handleDeleteMemo = (id: string) => {
    if (window.confirm("정말로 이 메모를 삭제하시겠습니까?")) {
      deleteMemoMutation.mutate(id);
    }
  };

  const displayEntries = searchQuery.length > 0 ? searchResults : entries;

  // Real-time date and time state
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrentDateTime = () => {
    const now = currentTime;
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    };
    return now.toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
      {/* Cherry Blossom Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-4 h-4 bg-pink-200 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-pink-300 rounded-full opacity-40 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-64 left-1/4 w-2 h-2 bg-pink-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-pink-100 rounded-full opacity-30 animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-80 left-1/2 w-3 h-3 bg-pink-200 rounded-full opacity-25 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-pink-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-pink-800 font-korean">
                  오늘의 일기장
                </h1>
                {/* Cherry Blossom Animation */}
                <div className="cherry-blossom-container">
                  <div className="cherry-blossom">
                    <div className="petal petal-1"></div>
                    <div className="petal petal-2"></div>
                    <div className="petal petal-3"></div>
                    <div className="petal petal-4"></div>
                    <div className="petal petal-5"></div>
                    <div className="center"></div>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleNewEntry}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-new-entry"
              >
                <Plus className="h-4 w-4 mr-2" />
                새 일기
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {viewMode === "form" && (
                <DiaryEntryForm
                  onSubmit={handleSubmitEntry}
                  onCancel={handleCancelForm}
                  isSubmitting={createEntryMutation.isPending}
                />
              )}

              {viewMode === "list" && (
                <>
                  {/* Search Bar */}
                  <div className="bg-card rounded-xl shadow-lg p-4 mb-6 border border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="일기 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-background"
                        data-testid="input-search"
                      />
                    </div>
                  </div>

                  <DiaryList
                    entries={displayEntries}
                    onEntryClick={handleEntryClick}
                    isLoading={entriesLoading}
                  />
                </>
              )}

              {viewMode === "content" && selectedEntry && (
                <DiaryContent
                  entry={selectedEntry}
                  onBack={handleBackToList}
                  onDelete={handleDeleteEntry}
                />
              )}
            </div>

            {/* Memo Sidebar */}
            <div className="lg:col-span-1">
              {/* Real-time Date and Time Display */}
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-pink-200 p-4 mb-6 text-center">
                <div className="text-lg font-medium text-pink-800 font-korean">
                  {formatCurrentDateTime()}
                </div>
                <div className="text-sm text-pink-600 mt-1">
                  실시간 업데이트
                </div>
              </div>
              
              <MemoSidebar
                memos={memos}
                onCreateMemo={handleCreateMemo}
                onDeleteMemo={handleDeleteMemo}
                isCreating={createMemoMutation.isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
