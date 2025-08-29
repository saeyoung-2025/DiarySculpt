import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface DiaryEntryFormProps {
  onSubmit: (entry: { title: string; content: string; emotion: string }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const emotions = [
  { emoji: "😊", label: "행복" },
  { emoji: "😢", label: "슬픔" },
  { emoji: "😠", label: "화남" },
  { emoji: "😴", label: "피곤" },
  { emoji: "🎉", label: "신남" },
];

export default function DiaryEntryForm({ onSubmit, onCancel, isSubmitting = false }: DiaryEntryFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("😊");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({
        title: title.trim(),
        content: content.trim(),
        emotion: selectedEmotion,
      });
      // Reset form
      setTitle("");
      setContent("");
      setSelectedEmotion("😊");
    }
  };

  return (
    <Card className="bg-card rounded-xl shadow-lg border border-border mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-card-foreground font-korean">
            일기 작성
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-cancel-form"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Emotion Selector */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2 font-korean">
              오늘의 기분
            </label>
            <div className="flex space-x-2">
              {emotions.map((emotion) => (
                <Button
                  key={emotion.emoji}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedEmotion(emotion.emoji)}
                  className={`p-3 transition-colors ${
                    selectedEmotion === emotion.emoji
                      ? "ring-2 ring-primary bg-secondary"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  data-testid={`button-emotion-${emotion.emoji}`}
                >
                  {emotion.emoji}
                </Button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2 font-korean">
              제목
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요..."
              className="bg-background"
              required
              data-testid="input-title"
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2 font-korean">
              내용
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="오늘 있었던 일을 자유롭게 써보세요..."
              className="resize-none bg-background"
              required
              data-testid="textarea-content"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              type="submit"
              disabled={!title.trim() || !content.trim() || isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              data-testid="button-save-entry"
            >
              {isSubmitting ? "저장 중..." : "저장"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              data-testid="button-cancel-entry"
            >
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
