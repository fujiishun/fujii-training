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

  def edit
    @book = Book.find(params[:id])
    if @book
      render json: { status: 200, book: @book }
    else
      render json: { status: 500}
    end
  end

  def update
    @book = Book.find(params[:id])
    if @book.update(books_params)
      render json: { status: 200, book: @book }
    else
      render json: { status: 500}
    end
  end

  def destroy
    @book = Book.find(params[:id])
    @book.destroy
  end
  
  def mypage
    @book = Book.where(user_id: params[:user_id])
    render json:  @book 
  end

  private

    def books_params
      params.require(:book).permit(:title, :label, :body, :user_id)
    end

  end
