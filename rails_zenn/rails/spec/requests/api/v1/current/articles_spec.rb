require 'rails_helper'

RSpec.describe "Api::V1::Current::Articles", type: :request do
  describe "POST api/v1/current/articles" do
    subject { post(api_v1_current_articles_path, headers:) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    context  "ログインユーザーに紐づく未保存ステータスの記事が 0 件のとき" do
      it "未保存ステータスの記事が新規作成される" do
        expect { subject }.to change { current_user.articles.count }.by(1)
        expect(current_user.articles.last).to be_unsaved
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "title", "content", "status", "created_at", "from_today", "user"]
        expect(res["user"].keys).to eq ["name"]
        expect(response).to have_http_status(:ok)
      end
    end

    
  end
end
