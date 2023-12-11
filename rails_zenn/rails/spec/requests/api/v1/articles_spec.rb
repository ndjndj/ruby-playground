require 'rails_helper'

RSpec.describe "Api::V1::Articles", type: :request do
  describe "GET api/v1/articles" do
    subject { get(api_v1_articles_path(params)) }

    before do
      create_list(:article, 25, status: :published)
      create_list(:article, 8, status: :draft)
    end

    context "page を params で送信しないとき" do
      let(:params) { nil }

      it "1ページ目のレコード10件取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["articles", "meta"]
        expect(res["articles"].length).to eq 10
        expect(res["articles"][0].keys).to eq ["id", "title", "content", "created_at", "from_today", "user"]
        expect(res["articles"][0]["user"].keys).to eq ["name"]
        expect(res["meta"].keys).to eq ["current_page", "total_pages"]
        expect(res["meta"]["current_page"]).to eq 1
        expect(res["meta"]["total_pages"]).to eq 3
        expect(response).to have_http_status(:ok)
      end
    end

    context "page を params で送信したとき" do
      let(:params) { { page: 2 } }

      it "該当ページ目のレコード10件取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["articles", "meta"]
        expect(res["articles"].length).to eq 10
        expect(res["articles"][0].keys).to eq ["id", "title", "content", "created_at", "from_today", "user"]
        expect(res["articles"][0]["user"].keys).to eq ["name"]
        expect(res["meta"].keys).to eq ["current_page", "total_pages"]
        expect(res["meta"]["current_page"]).to eq 2
        expect(res["meta"]["total_pages"]).to eq 3
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
