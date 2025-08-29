import { useState } from "react";
import { Memo } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, BarChart3, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface MemoSidebarProps {
  memos: Memo[];
  onCreateMemo: (content: string) => void;
  onDeleteMemo: (id: string) => void;
  isCreating?: boolean;
}

export default function MemoSidebar({ memos, onCreateMemo, onDeleteMemo, isCreating = false }: MemoSidebarProps) {
  const [newMemo, setNewMemo] = useState("");

  const handleSubmitMemo = () => {
    if (newMemo.trim()) {
      onCreateMemo(newMemo.trim());
      setNewMemo("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmitMemo();
    }
  };

  return (
    <div className="memo-sidebar">
      {/* Memo Section */}
      <Card className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-pink-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-semibold text-pink-800 font-korean">
              할 일 메모
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSubmitMemo}
              disabled={!newMemo.trim() || isCreating}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-add-memo"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Memo Input */}
          <div>
            <Textarea
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="메모를 입력하세요... (Ctrl+Enter로 저장)"
              className="resize-none bg-background h-20"
              data-testid="textarea-memo"
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={handleSubmitMemo}
              disabled={!newMemo.trim() || isCreating}
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium transition-colors"
              data-testid="button-save-memo"
            >
              {isCreating ? "저장중..." : "저장"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setNewMemo("")}
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium transition-colors"
              data-testid="button-clear-memo"
            >
              지우기
            </Button>
            <Button
              variant="outline"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium transition-colors"
              data-testid="button-draft-memo"
            >
              임시저장
            </Button>
          </div>

          {/* Saved Memos */}
          <div className="space-y-2">
            {memos.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm font-korean">
                  저장된 메모가 없습니다
                </p>
              </div>
            ) : (
              memos.map((memo) => (
                <div
                  key={memo.id}
                  className="memo-item bg-muted rounded-lg p-3 text-sm group hover:bg-muted/80 transition-colors"
                  data-testid={`memo-item-${memo.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-muted-foreground font-korean mb-1" data-testid={`memo-content-${memo.id}`}>
                        {memo.content}
                      </p>
                      <span className="text-xs text-muted-foreground" data-testid={`memo-date-${memo.id}`}>
                        {formatDistanceToNow(new Date(memo.createdAt), {
                          addSuffix: true,
                          locale: ko,
                        })}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteMemo(memo.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-accent transition-all ml-2"
                      data-testid={`button-delete-memo-${memo.id}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mood Chart */}
      <Card className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-pink-200 mt-6">
        <CardHeader>
          <CardTitle className="font-semibold text-pink-800 font-korean">
            <BarChart3 className="h-4 w-4 mr-2 text-pink-600 inline" />
            이번 주 감정 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-korean">행복</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
                <span className="text-xs text-muted-foreground">4</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-korean">평온</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <span className="text-xs text-muted-foreground">3</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-korean">우울</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
                <span className="text-xs text-muted-foreground">1</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 font-korean">
            {new Date().toLocaleDateString("ko-KR")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
