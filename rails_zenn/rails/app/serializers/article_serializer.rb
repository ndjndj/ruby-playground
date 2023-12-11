class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at, :from_today

  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end

  def from_today
    now = Time.zone.now
    created_at = object.created_at

    months = (now.year - created_at.year) * 12
            + now.month - created_at.month
            - ((now.day > created_at.day) ? 0 : 1)
    years = months.div(12)

  return "#{years}年前" if years > 0
  return "#{months}ヶ月前" if months > 0
  end
end
