class ArticleController < ApplicationController
  def post_file
      Article.create(file: params[:article][:image])
      render status: 200
  end 
end
