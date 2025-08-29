import { DiaryEntry } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface DiaryContentProps {
  entry: DiaryEntry;
  onBack: () => void;
  onDelete: (id: string) => void;
}

export default function DiaryContent({ entry, onBack, onDelete }: DiaryContentProps) {
  return (
    <Card className="bg-card rounded-xl shadow-lg border border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-back-to-list"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            목록으로
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-edit-entry"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(entry.id)}
              className="text-muted-foreground hover:text-accent transition-colors"
              data-testid="button-delete-entry"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <span className="text-3xl" data-testid="content-emotion">
            {entry.emotion}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-card-foreground font-korean" data-testid="content-title">
              {entry.title}
            </h1>
            <p className="text-muted-foreground font-korean" data-testid="content-date">
              {format(new Date(entry.createdAt), "yyyy년 M월 d일 EEEE a h:mm", { locale: ko })}
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p
            className="text-card-foreground leading-relaxed whitespace-pre-wrap font-korean"
            data-testid="content-text"
          >
            {entry.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
