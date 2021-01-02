Rails.application.routes.draw do
  namespace :v1 do
    get 'tasks/index'
    get 'tasks/show'
    get 'tasks/update'
    get 'tasks/destroy'
  end
  namespace :v1 do
    mount_devise_token_auth_for 'User', at: 'auth'
  end
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
