// components/CommentSection.tsx
import { useEffect, useState } from "react";

type CommentSectionProps = {
  postId: number;
  user?: {
    id: number;
    username: string;
    // ajoute d'autres champs si nécessaire
  } | null;
};

export default function CommentSection({ postId, user }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/post/${postId}`);
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("Connecte-toi pour commenter");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          postId,
          userId: user.id,
        }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments([newComment, ...comments]);
        setContent("");
      } else {
        alert("Erreur lors de l'envoi du commentaire");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="text-xl font-bold mb-2">Commentaires</h3>

      {comments.length === 0 && <p>Aucun commentaire pour l’instant.</p>}

      {comments.map((comment) => (
        <div key={comment.id} className="mb-2 border-b pb-2">
          <p className="text-sm text-gray-600">{comment.user?.username} a écrit :</p>
          <p>{comment.content}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border p-2 rounded"
          placeholder="Ton commentaire..."
        />
        <button type="submit" className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">
          Envoyer
        </button>
      </form>
    </div>
  );
}
