class FeedsController < ApplicationController
  require 'rss'
  before_action :require_signin
  before_action :set_feed, only: [:show, :edit, :update, :destroy]

  # GET /feeds
  # GET /feeds.json
  def index
    @feeds = current_user.feeds.all
    urls = []
    @feeds.each do |feed|
      urls.push feed.url
    end
    @feeds = Feedjira::Feed.fetch_and_parse urls

    @arrFeeds = []

    @feeds.each{ |key, feed| 
      @arrFeeds.push({
        title: feed.title,
        description: feed.description,
        url: feed.url,
        entries: feed.entries.map { |entry| 
          entry.inject({}) { |obj, attr| 
            obj[attr[0]] = attr[1]; 
            obj 
          } 
        }
      })
    }

    render json: @arrFeeds
  end

  # GET /feeds/1
  # GET /feeds/1.json
  def show
    @this_feed = current_user.feeds.find(params[:id])
    urls = []
    urls.push @this_feed.url
    @feed = Feedjira::Feed.fetch_and_parse @this_feed.url

    @feed = @feed.entries.map { |entry| 
      entry.inject({}) { |obj, attr| 
        obj[attr[0]] = attr[1]; 
        obj 
      } 
    }.to_json

    render json: @feed
  end

  # GET /feeds/new
  def new
    @feed = current_user.feeds.new
  end

  # GET /feeds/1/edit
  def edit
  end

  # POST /feeds
  # POST /feeds.json
  def create
    @feed = current_user.feeds.new(feed_params)

    respond_to do |format|
      if @feed.save
        format.html { redirect_to @feed, notice: 'Feed was successfully created.' }
        format.json { render :show, status: :created, location: @feed }
      else
        format.html { render :new }
        format.json { render json: @feed.errors, status: :unprocessable_entity }
      end
    end
    puts feed_params
  end

  # PATCH/PUT /feeds/1
  # PATCH/PUT /feeds/1.json
  def update
    respond_to do |format|
      if @feed.update(feed_params)
        format.html { redirect_to @feed, notice: 'Feed was successfully updated.' }
        format.json { render :show, status: :ok, location: @feed }
      else
        format.html { render :edit }
        format.json { render json: @feed.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /feeds/1
  # DELETE /feeds/1.json
  def destroy
    @feed.destroy
    respond_to do |format|
      format.html { redirect_to feeds_url, notice: 'Feed was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_feed
      @feed = current_user.feeds.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def feed_params
      params.require(:feed).permit(:url)
    end
end
