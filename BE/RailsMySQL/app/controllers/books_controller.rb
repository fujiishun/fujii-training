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
    if @book.nil?
      render json: { status: 500}
      return
    end
    render json: { status: 200, book: @book }
  end

  def edit
    @book = Book.find(params[:id])
    if @book.nil?
      render json: { status: 500}
      return
    end
    render json: { status: 200, book: @book }
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
    if @book.nil?
      render json: { status: 500}
      return
    end
    render json:  @book 
  end

  private

    def books_params
      params.require(:book).permit(:title, :label, :body, :user_id)
    end

  end
