class BooksController < ApplicationController
  def index
    @book = Book.all
    render json: @book
  end

  def create
    @book = Book.new(books_params)
    if @book.save
      render json: { status: 200, book: @book }
    else
      render json: { status: 500 }
    end
  end

  def show
    @book = Book.find(params[:id])
    if @book
      render json: { status: 200, book: @book }
    else
      render json: { status: 500}
    end
  end

  private

    def books_params
      params.require(:book).permit(:title, :label, :body)
    end

  end
