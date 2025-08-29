import { DiaryEntry } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface DiaryListProps {
  entries: DiaryEntry[];
  onEntryClick: (entry: DiaryEntry) => void;
  isLoading?: boolean;
}

export default function DiaryList({ entries, onEntryClick, isLoading = false }: DiaryListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-card rounded-xl shadow-lg border border-border animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded"></div>
                  <div className="w-32 h-4 bg-muted rounded"></div>
                </div>
                <div className="w-6 h-6 bg-muted rounded"></div>
              </div>
              <div className="w-48 h-6 bg-muted rounded mb-2"></div>
              <div className="w-full h-4 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <Card className="bg-card rounded-xl shadow-lg border border-border">
        <CardContent className="p-12 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-card-foreground mb-2 font-korean">
            아직 작성된 일기가 없습니다
          </h3>
          <p className="text-muted-foreground font-korean">
            첫 번째 일기를 작성해보세요!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card
          key={entry.id}
          className="bg-card rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
          onClick={() => onEntryClick(entry)}
          data-testid={`card-diary-entry-${entry.id}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl" data-testid={`emotion-${entry.id}`}>
                  {entry.emotion}
                </span>
                <span className="text-sm text-muted-foreground font-korean" data-testid={`date-${entry.id}`}>
                  {formatDistanceToNow(new Date(entry.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle more options
                }}
                data-testid={`button-options-${entry.id}`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <h3
              className="text-lg font-medium text-card-foreground mb-2 group-hover:text-primary transition-colors font-korean"
              data-testid={`title-${entry.id}`}
            >
              {entry.title}
            </h3>
            <p
              className="text-muted-foreground text-sm line-clamp-2 font-korean"
              data-testid={`preview-${entry.id}`}
            >
              {entry.content.length > 100
                ? `${entry.content.substring(0, 100)}...`
                : entry.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
